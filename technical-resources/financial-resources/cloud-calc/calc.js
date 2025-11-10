  ///////////////////////////////////////////////////
  // Cost calculator parameters:

  var defaults = {
    gpu_cost: .10, // $/GPU/hr
    rdbs_cost: 83.0, // $/month
    obj_storage_cost: 23.0, // $/TB/month
    data_egress_cost: 1.0, // $/GB
  }

  const vm_grades = {
    "light-weight": {
      cores: 1,
      ram: 2,
      cost_hr: .04,
    },
    "normally equipped": {
      cores: 2,
      ram: 32,
      cost_hr: .13,
    },
    "powerful": {
      cores: 8,
      ram: 128,
      cost_hr: 1.10,
    },
    "BEEFY": {
      cores: 16,
      ram: 256,
      cost_hr: 2.1,
    }
  }


  //
  ///////////////////////////////////////////////////

  function presentResult(context) {
    for (input of document.getElementsByClassName("form-control")) {
      let val = input.value
      if (input.type == "checkbox") {
        val = input.checked + "";
      } else if (!isNaN(val)) {
        val = parseFloat(val);
      }
      context[input.id] = val;
    }
    let assumptions = [];
    [assumptions, context] = calculate(context);

    $('#estimate-body').text("$" + context.total_cost_rounded);
    $('#estimate-exact').text("(rounding up from $" + context.total_cost.toFixed(2) + ")");
    $('#estimate').collapse();

    $('#estimate-assumptions').empty();
    for (assumption of assumptions) {
      // assumption = assumption.replace(/{{([A-Za-z0-9_]+)}}/g, '<input type=text class="assumption-var" id="assumption-var-$1" value="uhh">')

      assumption = assumption.replace(/{{([A-Za-z0-9_]+)}}/g,
        (match, p1) => {
          return `<input type=text class="assumption-var" id="assumption-var-${p1}" data-variable="${p1}" value="${context[p1]}">`;
      })
      $('#estimate-assumptions').append("<li>"+assumption+"</li>");
    }

    for (knob of document.querySelectorAll('.assumption-var')) {
      knob.style.width = textDims(knob)[0] + "px";
      knob.addEventListener('input', (e)=>{
        let knob = e.target
        knob.style.width = textDims(knob)[0] + "px";
        context[knob.dataset.variable] = parseFloat(knob.value);
        let [unused, new_context] = calculate(context);
        $('#estimate-body').text("$" + new_context.total_cost_rounded);
        $('#estimate-exact').text("(rounding up from $" + new_context.total_cost.toFixed(2) + ")");
        context = new_context;
      });
    }

  }

  function calculate(context) {
    context = JSON.parse(JSON.stringify(context));

    let assumptions = []

    // Workstation cost
    context.workstation_vm_cost ||= vm_grades[context["workstation-vm-grade"]].cost_hr;
    context.work_week ||= 40;
    assumptions.push("{{work_week}} hours of work station uptime per week");
    assumptions.push("${{workstation_vm_cost}}/hr for a "+context['workstation-vm-grade']+" workstation")
    if (context["gpu-toggle"] == "with") {
      context.workstation_gpu_cost = context["n-gpus"]*context.gpu_cost;
      assumptions.push("${{gpu_cost}} / gpu / hour")
    } else {
      context.workstation_gpu_cost = 0;
    }

    let workstation_cost = context.people * (context.workstation_vm_cost + context.workstation_gpu_cost) * context.work_week * 4;

    // Data storage cost
    let ds_start_size_normal = {
      "MB": context["ds-start-size"]/1e6,
      "GB": context["ds-start-size"]/1e3,
      "TB": context["ds-start-size"],
      "PB": context["ds-start-size"]*1e3
    }[context["ds-start-unit"]];

    let ds_accum_size_normal = {
      "MB": context["ds-accum-size"]/1e6,
      "GB": context["ds-accum-size"]/1e3,
      "TB": context["ds-accum-size"],
      "PB": context["ds-accum-size"]*1e3
    }[context["ds-accum-unit"]];

    let ds_accum_total = {
      "day": ds_accum_size_normal*30.0,
      "month": ds_accum_size_normal,
      "year": ds_accum_size_normal/12.0
    }[context["ds-accum-period"]];

    let ds_size_total = ds_start_size_normal + ds_accum_total;

    assumptions.push("No initial data import cost");
    assumptions.push("Data stored in object storage");
    assumptions.push("Data storage rated at ${{obj_storage_cost}} / TB / month");
    assumptions.push("Data egress rated at ${{data_egress_cost}} / GB");
    let data_cost = ds_size_total * context.obj_storage_cost;

    if (context["ds-rdbs"] == "true") {
      data_cost += context.rdbs_cost;
      assumptions.push("${{rdbs_cost}} / month for a managed relational database server");
    }

    // Long-term/one-time storage costs

    let longterm_cost = 0;

    if (context["ds-longterm-toggle"] == "be") {
      let ds_longterm_size_normal = {
        "MB": context["ds-longterm-size"]/1e6,
        "GB": context["ds-longterm-size"]/1e3,
        "TB": context["ds-longterm-size"],
        "PB": context["ds-longterm-size"]*1e3
      }[context["ds-longterm-unit"]];

      let backup_download_cost = ds_longterm_size_normal * 1e3 * context.data_egress_cost;
      assumptions.push("Including a backup download of long-term data which costs $" + backup_download_cost.toFixed(2))

      longterm_cost += ds_longterm_size_normal * context.obj_storage_cost * 12 * context["ds-longterm-years"] + backup_download_cost;
    }

    // Heavy computations cost

    let n_jobs_normal = {
      "month": context["n-jobs"],
      "year": context["n-jobs"] / 24.0,
    }[context["n-job-period"]];
    context.job_vm_cost ||= vm_grades[context["job-vm-grade"]].cost_hr;
    let job_cost = n_jobs_normal * context["n-job-vms"] * context.job_vm_cost * 24 * context["job-length"];
    assumptions.push("${{job_vm_cost}}/hr for "+context["job-vm-grade"]+" compute cluster VMs")

    // Totals

    context.total_cost = (workstation_cost + data_cost + job_cost) * 12 * context["n-years"] + longterm_cost;

    context.total_cost_rounded = Math.ceil(context.total_cost / 1000) * 1000;

    console.log(JSON.stringify(context))
    window.location.href = window.location.pathname + "#" + encodeURIComponent(JSON.stringify(context))

    let share_url = new URL("mailto:help@cloudbank.org")
    share_url.searchParams.append("subject", "Cloud cost estimation discussion")
    share_url.searchParams.append("body", "Here's a link to my cost estimate: \n"+window.location.href);
    document.getElementById("cb-share").href = share_url.toString();

    return [assumptions, context]
  }

  function textDims(inputElem) {
    var elem = document.getElementById("width-machine");
    elem.innerText = inputElem.value;
    elem.style.font = window.getComputedStyle(inputElem).width;
    return [elem.clientWidth + 1, elem.clientHeight + 1]
  }

  function updatePlurals() {
    $(".plural").each(function() {
      let quantity_element = "#"+$(this)[0].dataset.quantity;
      let quantity = parseFloat($(quantity_element).val());
      let word = $(this).html().trim()
      if (quantity == 1){
        // De-pluralize
        if (word == "person" || word == "people") {
          $(this).html("person");
        } else if (word.endsWith("s")) {
          $(this).html(word.slice(0,-1));
        }
      } else {
        // Pluralize
        if (word == "person" || word == "people") {
          $(this).html("people");
        } else if (!word.endsWith("s")) {
          $(this).html(word+"s");
        }
      }
    });
  }

  $(function () {
    for (grade in vm_grades) {
      let subtext = vm_grades[grade].cores + " cores, " + vm_grades[grade].ram + " GB ram"
      $("select.vm-grade").append("<option data-subtext='"+subtext+"'>"+grade+"</option>");
    }

    $("select.vm-grade").each(function() {
      $(this).val($(this)[0].dataset.default)
    });

    $(".vm-grade").selectpicker("refresh");
    $(".vm-grade").selectpicker("render");
  });


  $(function () {
    if (window.location.hash != "") {
      var url_context = JSON.parse(decodeURIComponent(window.location.hash.slice(1)))
      for (const [key, value] of Object.entries(url_context)) {
        let elem = document.getElementById(key);
        if (elem && elem.classList.contains("form-control")) {
          if (elem.type == "checkbox") {
            elem.checked = value == "true";
          } else {
            elem.value = value;
          }
          if (elem.classList.contains("selectpicker")) {
            $("#"+elem.id).selectpicker('refresh');
          }
        }
      }
      presentResult(url_context);
    }
  });

  $("#gpu-toggle").change(function() {
    if ($(this).val() == "with") {
      $('#n-gpus').show();
      $('#gpu-suffix-text').html("&nbsp;<div data-quantity='n-gpus' class='plural'>GPUs</div>&nbsp;each.");
    } else {
      $('#n-gpus').hide();
      $('#gpu-suffix-text').html("&nbsp;GPUs.");
    }
  });
  $("#gpu-toggle").trigger("change");

  $("input").change(updatePlurals);
  $("select").change(updatePlurals);
  updatePlurals();

  $("#ds-longterm-toggle").change(function() {
    if ($(this).val() == "be") {
      $('#ds-longterm-controls').show();
    } else {
      $('#ds-longterm-controls').hide();
    }
  });
  $("#ds-longterm-toggle").trigger("change");
