# HPC and computationally intensive workloads

Cloud platforms can be set up to run a job scheduling system similar to Xsede or an on-campus super computing cluster. One of the major benefits to this is that these systems can automate the allocation and release of virtual machines, minimizing the cost and time spent crunching data.

In general, jobs are packaged in the form of Docker container images. For an introduction to Docker, check out CloudBank's [Containerization Solution](../solutions/cbs-containerization/).

## Turnkey job submission

A turn-key job submission service requires little to no setup on your end. These are usually called "batch" services, and are a good place to start if you don't need fine-grain tuning of your setup.

- AWS:
    - [AWS Batch](https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html)
- Azure:
    - [Azure Batch](https://docs.microsoft.com/en-us/learn/modules/run-parallel-tasks-in-azure-batch-with-the-azure-cli/)
- Google Cloud Platform:
    - Although not branded a generic HPC system, GCP's AI Platform can be used to [submit general computation jobs](https://cloud.google.com/ai-platform/training/docs/training-jobs)
    - There is also an unofficial tool to do job submission: [dsub](https://github.com/DataBiosphere/dsub)


## Under the hood: setting up a workload scheduler (eg, Slurm)

If you're running applications that require more fine tuning than just a job submission interface or powerful CPUs, most cloud platforms offer "compute cluster" services attempting to be drop-in replacements for on-campus HPC clusters.

- AWS:
    - [CloudBank Solution on setting up an AWS HPC cluster](https://github.com/cloudbank-project/hpc/tree/main/aws)
    - [AWS ParallelCluster](https://docs.aws.amazon.com/parallelcluster/latest/ug/what-is-aws-parallelcluster.html)
- Azure:
    - [Azure CycleCloud](https://docs.microsoft.com/en-us/learn/modules/azure-cyclecloud-high-performance-computing/)
    - [General HPC Azure tutorial](https://docs.microsoft.com/en-us/learn/modules/intro-to-hpc/)
- Google Cloud Platform:
    - [HPC best practices on GCP](https://cloud.google.com/architecture/best-practices-for-using-mpi-on-compute-engine)
    - [Creating an HPC-tuned VM](https://cloud.google.com/compute/docs/instances/create-hpc-vm)


## Case Studies

- [Computing at Scale using Rosetta](https://www.cloudbank.org/training/use-case/htc-rosetta): Dr. Parisa Hosseinzadeh and her team were able to utilize the massively parallel nature of the cloud to simulate protein folding at an astounding rate using AWS Batch and cost-effective spot instances.
- [Wildfire Modeling with TPUs](https://www.cloudbank.org/training/rroccet21-wildfire-modeling-tpus): A team at Google used GCP's TPU processing clusters to perform large-scale CFD simulations of recent wildfire disasters, helping to improve model accuracy and improve predictions for future events.
