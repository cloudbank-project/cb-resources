# Science Gateways and Dataset Dissemination

The cloud can be a big help in making a datasets available to others in your field. The primary challenge is in dealing with ongoing storage fees and the extra egress charges that cloud platforms levy for downloads of your data. There are a few strategies towards dealing with this:

- Encouraging cloud-native, storage-adjacent computation
- Taking advantage of cheaper object storage, which can be binned and discounted based on frequency of access.
- Taking advantage of vendor-specific discount programs for publicly hosted scientific data

The rest of this article will go into these strategies in detail.


## Storage-adjacent Computation

The approach that many cloud-hosted gateways take towards disseminating data is providing an experimentation platform, usually a JupyterHub, to their users. This way, rather than every user of the dataset downloading what they need to their own storage, they simply run their code or use tools hosted on cloud machines that have free access to the central dataset.


## Case studies

- [Analysis Ready Data in the Cloud](https://www.cloudbank.org/training/rroccet21-analysis-ready-data-cloud): Charles Stern of the [Pangeo Project](https://pangeo.io) shows us the power of making coding environments available on the cloud right next to where their data sets are stored.
- [Data storage for neuroscience at a massive scale](https://www.cloudbank.org/training/rroccet21-data-storage-neuroscience-massive-scale): Dr. Satra Ghosh introduces us to the [DANDI Archive](https://dandiarchive.org/), a thorough archive of neuroscience data made available through the use of distributed cloud services
