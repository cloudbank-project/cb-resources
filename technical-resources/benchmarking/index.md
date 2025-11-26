# Benchmarking

## What is the HPL benchmark?

The High Performance Computing Challenge (HPCC) benchmark suite is used to evaluate the performance and cost of variable cloud compute instances in a comprehensive way. Specially HPL performance in the HPCC tests were comparatively analysed with its performance and price on spot instance use in different hardware architectures under various cloud environments: AWS, Google Cloud, Azure.

**Main purposes:**

- To measure HPL performance and its costs across diverse cloud compute instances in different system architectures (AMD, INTEL, ARM) under various cloud services (AWS, Google Cloud, Azure).
- To provide comparison of their performance and spot instance costs on the instances used.

**Considered systems in AWS:**

| CPU systems | vCPUs | Memory (GB) | AWS instances |
|------------|-------|-------------|---------------|
| 4th gen. AMD Epyc 9R14 | 4,32,64,192 | 16,64,128,256,768,1536 | M7a.xlarge, m7a.8xlarge, m7a.16xlarge, c7a.8xlarge,r7a.8xlarge, m8a.8xlarge, m8a.48xlarge,r8a.48xlarge |
| ARM (Graviton3,4) | 4,32,64 | 16,64,128,256 | M7g.xlarge, m7g.8xlarge, m7g.16xlarge, m8g.8xlarge |
| 4th Gen. Intel Xeon 8488C | 4,32,64 | 16,64,128,256 | M7i.xlarge, m7i.8xlarge, m7i.16xlarge, m8i.8xlarge |

## How is it being run?

The OS of Ubuntu (corresponding AMI) is used to build the benchmark environment. Instance launch script appended in this report is used. EC2 launch script needs to be updated to the AMI ids frequently to reflect the current version of the OS.

### Compilation

On each new instance, OpenMPI and HPCC are built with SPACK HPC package manager. Compilation optimization flag "-O2" or "-O3" is used with gcc. Other options can be used like `spack install cflags="-O3 -mavx512" cppflags="-O3 -mavx512"`

### Problem Size

Approximately 70% of physical memory is used by setting the HPL N parameter in the following way:

N= sqrt(Memory X 0.7 / 8)

**N size for HPL runs with 70% memory ratio:**

| MEM Size (GB) | 16 | 64 | 128 | 256 | 384 | 512 | 768 | 1536 |
|---------------|----|----|-----|-----|-----|-----|-----|------|
| N Size | 39000 | 77500 | 109000 | 155000 | 189000 | 220000 | 270000 | 380000 |

### Run

Each case is run by a spot EC2 launch script shown in the appendix. Actual start of the instance will be when the spot capacity is available for the request. The following image shows the spot instance is in the capacity queue with price information at the time of the information status.

<img src="benchmarking-static/spot-instance.png" class="border"/>

## Results & Analysis

**HPL Performance and cost on the instance used**

| Instance | CPU | Theor. Peak (Gflops) | 70% mem. Peak (Gflops) | Time took for test (secs) | Total Price (on-demand $) | Total Price (Spot) |
|----------|-----|---------------------|------------------------|--------------------------|--------------------------|-------------------|
| m7a.8xlarge | 4th gen. AMD Epyc 9R14 | 1,331.20 | 812 | 1062 | 0.56 | 0.26 |
| m7g.8xlarge | Graviton3 | 665.60 | 385 | 2244 | 0.81 | 0.24 |
| m7i.8xlarge | 4th Gen. Intel Xeon 8488C | 1,228.80 | 1120 | 771 | 0.36 | 0.14 |
| m7a.16xlarge | 4th gen. AMD Epyc 9R14 | 2,662.40 | 1472 | 1686 | 3.71 | 0.68 |
| m7g.16xlarge | Graviton3 | 1,331.20 | 759.2 | 3270 | 2.61 | 0.99 |
| m7i.16xlarge | 4th Gen. Intel Xeon 8488C | 2,457.60 | 1809 | 1372 | 1.23 | 0.51 |
| m7a.xlarge | 4th gen. AMD Epyc 9R14 | 166.40 | 106.6 | 371 | 0.02 | 0.01 |
| m7g.xlarge | Graviton3 | 83.20 | 48.9 | 808 | 0.04 | 0.03 |
| m7i.xlarge | 4th Gen. Intel Xeon 8488C | 153.60 | 171.5 | 231 | 0.01 | 0.01 |
| c7a.8xlarge | 4th gen. AMD Epyc 9R14 | 1,331.20 | 817 | 380 | 0.17 | 0.09 |
| r7a.8xlarge | 4th gen. AMD Epyc 9R14 | 1,331.20 | 812 | 1062 | 0.56 | 0.26 |
| m8a.8xlarge | 4th gen. AMD Epyc 9R45 | 1,331.20 | 1581 | 546.25 | 3.71 | 0.09 |
| m8g.8xlarge | Graviton4 | 716.80 | 366 | 2362 | 2.61 | 0.35 |
| m8i.8xlarge | Intel Xeon Granite Rapids | 1,382.40 | 1090 | 792 | 0.37 | 0.20 |
| m8a.48xlarge | 4th gen. AMD Epyc 9R14 | 7,987.20 | 3658 | 3587 | 11.64 | 4.21 |
| r8a.48xlarge | 4th gen. AMD Epyc 9R14 | 7,987.20 | 3706 | 9871 | 42.05 | 5.19 |

<img src="benchmarking-static/spot-price-comparison.png" class="border"/>

<img src="benchmarking-static/spot-price-problem-size.png" class="border"/>

## Appendix

### AWS User Data

```bash
#!/bin/bash
cd /home/ubuntu
# starting time stamp
date > myproc.txt
chmod a+rw myproc.txt
# access key setup
export AWS_ACCESS_KEY_ID="xxx"
export AWS_SECRET_ACCESS_KEY="xxx"
echo $AWS_ACCESS_KEY_ID:$AWS_SECRET_ACCESS_KEY > .access.key
chown ubuntu:ubuntu .access.key
chmod 600  .access.key
pwd >> myproc.txt
cat .access.key >> myproc.txt
# install base software set
sudo apt-get update -y
sudo apt-get install s3fs -y
sudo apt-get install -y gfortran gcc g++ make automake autoconf bzip2 cmake libtool-bin
sudo apt-get install -y patchelf python3-pip
# operation as the user
sudo -u ubuntu -i << 'EOF'
mkdir s3
# mount s3 storage
s3fs cb2bme1 s3 -o passwd_file=.access.key
echo "im in ubuntu" >> myproc.txt
pwd >> myproc.txt
ls s3 >> myproc.txt
# setup for spack
mkdir -p appker akrr_scratch
git clone https://github.com/nsimakov/akrr.git
cp -r akrr/akrr/appker_repo/inputs akrr/akrr/appker_repo/execs ~/appker
cd ~/appker/execs/
git clone -c feature.manyFiles=true https://github.com/spack/spack.git
source ~/appker/execs/spack/share/spack/setup-env.sh
# install and load openmpi and hpcc
spack install openmpi
spack load openmpi
spack install hpcc
spack load hpcc
cd /home/ubuntu
# set up and run hpcc 
mkdir hpcc
cd hpcc
cp ~/s3/hpccinf.txt .
time mpirun -np 16 hpcc >> ../myproc.txt
# exit environment print
cp hpccoutf.txt  ~/s3/.
cd
date >> myproc.txt
cp myproc.txt s3/.
EOF
# shutdown the spot instance
sudo shutdown -h now
```

### HPCC Input Data (hpccinf.txt)

```text
HPLinpack benchmark input file
Innovative Computing Laboratory, University of Tennessee
HPL.out      output file name (if any)
6            device out (6=stdout,7=stderr,file)
4            # of problems sizes (N)
29 30 34 35  Ns
4            # of NBs
1 2 3 4      NBs
0            PMAP process mapping (0=Row-,1=Column-major)
3            # of process grids (P x Q)
2 1 4        Ps
2 4 1        Qs
16.0         threshold
3            # of panel fact
0 1 2        PFACTs (0=left, 1=Crout, 2=Right)
2            # of recursive stopping criterium
2 4          NBMINs (>= 1)
1            # of panels in recursion
2            NDIVs
3            # of recursive panel fact.
0 1 2        RFACTs (0=left, 1=Crout, 2=Right)
1            # of broadcast
0            BCASTs (0=1rg,1=1rM,2=2rg,3=2rM,4=Lng,5=LnM)
1            # of lookahead depth
0            DEPTHs (>=0)
2            SWAP (0=bin-exch,1=long,2=mix)
64           swapping threshold
0            L1 in (0=transposed,1=no-transposed) form
0            U  in (0=transposed,1=no-transposed) form
1            Equilibration (0=no,1=yes)
8            memory alignment in double (> 0)
```

### AWS EC2 Spot Instance Launch Command

```bash
aws ec2 request-spot-instances \
    --instance-count 1 \
    --launch-specification '{
        "ImageId": "ami-0360c520857e3138f",
        "InstanceType": "m7a.8xlarge",
        "KeyName": "cb2-dl1",
        "SecurityGroupIds": ["sg-07521ca76dfb83920"],
        "Placement": {"AvailabilityZone": "us-east-1a"},
        "UserData": "IyEvYmluL2Jhc2gKY2QgL2hvbWUvdWJ1bnR1CmRhdGUgPiBteXByb2MudHh0CmNobW9kIDc3NyBteXByb2MudHh0CmV4cG9ydCBBV1NfQUNDRVNTX0tFWV9JRD0iQUtJQVNBMlZTSVNLRUVPSFRKNUciCmV4cG9ydCBBV1NfU0VDUkVUX0FDQ0VTU19LRVk9IlF6N2V1VmZUOXc2SFVYY3lQVXVocVJHcll…dHUKc3VkbyBzaHV0ZG93biAtaCBub3cK"
    }'
./price.x m7a.8xlarge > price.txt
```

### AWS Spot Price Extraction Command

```bash
cdate=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
aws ec2 describe-spot-price-history --instance-types $1 --availability-zone us-east-1a --start-time $cdate
```
