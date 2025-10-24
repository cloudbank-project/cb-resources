# Quantum Computing

As quantum computing systems become increasingly practical, they are also becoming available through cloud computing platforms. The benefit of this is that, like any other cloud computing resource, you can access it through your CloudBank account. In this solution, we outline the details you should consider as you explore the use of these systems through public cloud platforms.

There are roughly four components to consider when approaching cloud-based quantum computing:

- The cloud infrastructure and pricing policies around accessing quantum services.
- The quantum computer itself. Quantum computers are very much not all made equal, and different models tend to be optimized towards solving different sorts of problems. As such, most cloud platforms offer a diversity of machines.
- Quantum simulators used for free or low-cost testing of your quantum algorithms.
- The programming interface and libraries used to access the above (often specific to the cloud platform being used)

Since the quantum landscape is young and rapidly evolving, the details and pricing of these components naturally change at a rapid pace. As such, we provide summaries and links to the relevant pages of various platforms and avoid directly posting information like pricing, which may quickly become stale. The information as follows is current as of April 2022.

### AWS
AWS's quantum offerings are all grouped under the service called [Braket](https://aws.amazon.com/braket/). This includes several varieties of third-party quantum hardware, simulators, and libraries to integrate your quantum code with other AWS services.

Braket supports traditional job submission to a task queue, and a "hybrid" jobs that involve looping between iterations of a quantum algorithm and processing its results on a traditional virtual machine. The benefit of this mode is that the quantum tasks can "jump" the task queue and run more quickly, though given the extra traditional hardware there is an associated extra cost.

#### Hardware support

Braket currently provides access to trapped-ion devices from IonQ, superconducting devices from Rigetti and OQC, and quantum annealers from D-Wave.

#### Pricing

On hardware, AWS charges a flat "task" fee to load your algorithm, and then a "shot" fee for every time it actually runs. Cloud-based simulators are charged per minute of use. Local simulators are available to use for free. For more information, see the [pricing table](https://aws.amazon.com/braket/pricing/)



### Azure

Azure's quantum offerings are all grouped under the service called [Azure Quantum](https://azure.microsoft.com/en-us/services/quantum). This includes several varieties of third-party quantum hardware, software simulators, and libraries to integrate your quantum code with other Azure services. They also offer "Quantum-inspired" hardware for solving optimization problems (see [their documentation](https://docs.microsoft.com/en-us/azure/quantum/qio-target-list)), which while not true quantum computing can still be used to efficiently run a wide variety of algorithms

#### Hardware support

Azure Quantum currently provides access to trapped-ion devices from IonQ and Honeywell Quantinuum, superconducting devices from Rigetti and Quantum Circuits Inc, neutral-atom devices from Pasqal, and quantum-inspired classical hardware solvers from 1QBit, Toshiba SQBM+, and their own in-house development team.

#### Pricing

Azure Quantum's pricing has different models depending on the hardware being used. On their IonQ machines, computation is charged per-shot. Other machines like Honeywell's Quantinuum have a more subtle credit-based pricing model. For the details, see the [pricing table](https://docs.microsoft.com/en-us/azure/quantum/pricing) for quantum hardware. Azure's quantum-inspired solvers are billed per-hour, and can be referenced from [this pricing table](https://azure.microsoft.com/en-us/pricing/details/azure-quantum/#pricing)



### GCP

Google Cloud Platform currently provides access to trapped-ion devices from IonQ through their [GPC Marketplace IonQ Service](https://ionq.com/docs/get-started-with-google-cloud). Although Google has also developed [in-house proprietary quantum hardware](https://quantumai.google/quantum-computing-service), it is still in Early Access and has not been made available to the general public through their cloud platform.

#### Hardware support

GCP currently only provides access to IonQ devices, presumably with their in-house hardware being released through the platform at some point in the future.

#### Pricing

GCP's billing for IonQ use is per-gate and per-shot, the details of which can be found on the subscription page for the IonQ service.



### IBM

IBM offers cloud access to proprietary quantum hardware through its [Qiskit Runtime service](https://cloud.ibm.com/quantum). This includes a rich circuit development application and lots of learning resources:

 - [Cloud quantum service page](https://cloud.ibm.com/catalog/services/quantum-computing)
 - [Qiskit pricing information](https://cloud.ibm.com/docs/quantum-computing?topic=quantum-computing-cost)
 - [Introduction to Qiskit](https://research.ibm.com/blog/qiskit-runtime-for-useful-quantum-computing)
 - [Recorded Qiskit tech demo](https://www.youtube.com/watch?v=2eeIlWM5l94) (video)

#### Hardware support

Qiskit Runtime provides access to IBM's various lines of proprietary quantum hardware. For details about these machines, see their [documentation](https://quantum-computing.ibm.com/composer/docs/iqx/manage/systems/processors).

#### Pricing

On hardware, IBM charges per runtime-second. Their cloud-based simulators are free to use. For more information, see the [pricing table](https://cloud.ibm.com/catalog/services/quantum-computing)





### Learning Resources

#### Textbooks

- [Learn Quantum Computation using Qiskit](https://qiskit.org/textbook/preface.html) is a free general-purpose textbook published by IBM's quantum group that teaches the basics of quantum computation and algorithms using their qiskit domain-specific language

#### Blogs and Links of Interest

- [Azure announces topological qbit progress](https://www.hpcwire.com/off-the-wire/microsofts-announces-progress-on-a-new-type-of-qubit/)
