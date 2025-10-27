# Machine Learning in the Cloud

The cloud is particularly well suited to training neural networks (or any other form of ML model); it can provide as much computational power as you need, when you need it, and you pay for only what you use.

There is a substantial amount of overlap between the needs of Machine Learning projects and more general HPC workloads. That said, cloud platforms tend to provide separate services for [general HPC workloads](./hpc.md) and for ML-specific work. These ML services offer value-add tools to make training and inspecting models easier, and can often be built off of pre-trained models provided by the platform. The rest of this article goes into detail about such dedicated ML services.

The major pieces of instracture to think about for ML workloads include:

- **Development / Experimentation**

    ML models are usually developed in notebook environments like Jupyter, on smaller subsets of the complete data set. All major cloud platforms can host python notebooks for you; that is, you upload your notebook file and are given a URL to access the notebook interface without further setup on your end. That said, it may be more cost effective to do this on your own computer.

    See [&sect;Notebooks](#notebooks) for resources on running your notebooks in the cloud.

- **Job submission**

    Once you like how your model runs on subsets of the data, it's useful to train it on the full dataset in a non-interactive environment that may run for a couple of hours or days. This is where the cloud really shines, using container technologies like Docker or Singularity. On your local computer you package training script and any libraries it depends on into a container, and then submit the container to be run in the cloud like an HPC job. This is where you can ask for beefy compute power with GPUs attached, which are costly but only charged for the precise amount of time needed for the job to run.

    See [&sect;Containers](#containers) for resources on packaging your work into containers and submitting them to the cloud.

- **Dataset storage**

    In order to compute effectively, cloud platforms need your data sets to be stored in-cloud alongside your code. The most straight-forward way to do this is to use your cloud platform's file storage service, which behaves much like Google Drive or Dropbox. To reduce storage cost by a factor of 10, you can instead use your platform's *object* storage service. This stores your data in the cloud in a way that is internally more efficient, but requires you to write some code to store/retrieve it.

    See [&sect;Storage](#storage) for resources on getting your data into file or object storage accounts.

- **Deployment**

## Guides

### Notebooks

There are two routes to go for serving notebooks from the cloud:

- **Notebook services**

    Most cloud platforms provide a notebook service that allows you to upload your python notebooks and work with them through your browser without any further configuration. These services are usually packaged within a larger Machine Learning-focused workspace, that tends to be cost-free to set up and intended to be an onramp to platform-specific ML tools.

    Guides:

    - AWS: [Notebooks with Sagemaker](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-setup-working-env.html)

    - Azure: [Notebooks with Azure Machine Learning Studio](https://docs.microsoft.com/en-us/azure/machine-learning/how-to-run-jupyter-notebooks)

    - GCP: [Notebooks with Jupyterlab](https://cloud.google.com/notebooks). Google also offers a separate service, [Google Colab](https://colab.research.google.com/notebooks/), which currently has a resource-limited free tier and a more feature-rich pro tier.



- **Virtual Machines**

    Like running Jupyter on your own local computer, you can create a virtual machine hosted in the cloud that runs a Jupyter Notebook server. Most cloud platforms provide Linux VMs that come pre-installed with Anaconda, Jupyter and other common data science libraries.

    This method is the most flexible and consistent across cloud platforms, but also the most costly; you're paying for the notebook server even when you're not using it.

    Guides:

    - AWS: [Deep Learning AMI](https://docs.aws.amazon.com/dlami/latest/devguide/what-is-dlami.html)

    - Azure: [Data Science Virtual Machine (DSVM)](https://azure.microsoft.com/en-us/services/virtual-machines/data-science-virtual-machines/)

    - GCP: [Deep Learning VM Image](https://cloud.google.com/deep-learning-vm/docs/)



### Containers

Cloud platforms often provide services to run Docker containers without needing to set up a full virtual machine to do so (this is one of the common things referred to by "serverless" computing). Because Docker containers are often used for running web app infrastructure, this is what cloud services and documentation are geared towards. That said, they can just as well be used for long-running machine learning jobs. Cloud platforms are also beginning to offer ML-focused container services as well, usually under different names than the generic container jazz.

Guides:

- AWS: [Hands-on: train a deep learning model](https://aws.amazon.com/getting-started/hands-on/train-deep-learning-model-aws-ec2-containers/)

- Azure: [Train a model by using a custom Docker image](https://docs.microsoft.com/en-us/azure/machine-learning/how-to-train-with-custom-image)

- GCP: [AI Platform Containers Overview](https://cloud.google.com/ai-platform/training/docs/containers-overview)



### Storage

Broadly, cloud platforms provide two different kinds of data storage service:

- **File storage**

    File storage services behave like a traditional network drive you can mount to your computer: they contain files stored in a directory structure, which can be manipulated using traditional file managers and UNIX commands. To access files from your code, you use the standard methods you're used to.

    The downside of these services is that they tend to cost a factor of 10 more than the equivalent amount of object storage, since what you gain in ease of use the cloud platform loses in behind-the-scenes flexibility.

    Guides:



- **Object storage**

    Object storage services ask you to upload and download files individually through a web API, and don't provide a directory structure to organize those files. The way this generally looks for your work is you initially write a script to upload files from your local machine into object storage en-masse, and then when you want to use said files in the cloud you use a language-specific library to load them.

    Although this requires extra work on your part, if you can build it into your workflow you can generally reduce your storage costs by at least a factor of 10.

    Guides:
    - Azure: [Azure Blob storage with Python](https://docs.microsoft.com/en-us/azure/developer/python/azure-sdk-example-storage-use)




## Case Studies

- [Deep Learning on AWS: How artificial intelligence helps monitor forest dryness](https://www.cloudbank.org/training/use-case/supervised-machine-learning)
