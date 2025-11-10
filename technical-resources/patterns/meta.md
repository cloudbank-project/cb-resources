# Meta

We include this page for common meta-practice / meta-design. We try to describe *what* is useful and *how* one learns
to use it. The theme is collaborative data science irrespective of cloud computing. Research computing methods advocacy
is a broader topic includes cloud but many other tools and technologies and methods besides.


## Learning curves and time investment

These topics may seem daunting. They tend to make sense with some dedicated time and effort. As with
research there is no substitute for clearing away distractions and focusing for an
extended period (from minutes to months depending) developing new skills. The good news is that
we are in a "boom" era for documentation, tutorials, knowledge bases and debugging tools.
For example it is now common practice -- given a bug some code -- to paste the error message into a browser
and shortly arrive at
a good solution to the problem on Stack Overflow. YouTube abounds with walk-throughs and tutorials;
and resource books such as the Python Data Science Handbook can be found online at no cost.


## Help us curate good training resources

Suppose you are interested in analyzing dolphin vocalizations.
You may find a training series on YouTube; or you may create one.
As a more concrete example we found
[this](https://regexone.com/) training resource on learning how to work with **regular expressions**. Super powerful
if you work with text interpretation and parsing, say in NLP. So we put that link below. If you
find a good resource: Tell us so we can put it here!

## Linux

The point: Linux may not be your OS of choice but in terms of open source affinity and getting stuff done: There is a lot
to recommend its use.


## The shell


The point: cf Linux. By 'the shell' we mean 'the Linux command line interpreter program'.


## Software versioning and `git`

The point: Want a safe stable backup of your code base? Learn some sort of software versioning.
The best one is still terrible. It is called `git`. The only good thing about it is that you can
be reasonably proficient by having a cheat sheet of 12 `git` sub-commands.


## GitHub and GitLab


The point: cf `git`. That safe stable backup can live on a safe stable website called **GitHub**. Your
projects become *repositories* there; and you can make them public or private. GitHub is free or cheap.


## Jupyter notebooks

The point: You can develop programs as text files... or you can use an abstraction layer called a Jupyter notebook
as a development environment. In the latter case you can break your code up into smaller blocks and run them
piecemeal. This fragmentation even supports interspersed documentation; nicely formatted human-readable text.


## Environments and Environment Bootstrapping

The point: If you configure your data science computing environment by installing specialized libraries: You can
also automate this process. It makes reproducing your environment much simpler, at the cost of some time invested
in the process.


## Binder sandboxes


The point: A simple bit of reproducibility is provided at not cost by [**binder**](https://mybinder.org), a service
that will replicate and execute your Jupyter notebooks. It is a very low-power copy of your computing environment
so you will not be able to use it to calculate big things like the mass of the proton. But it is automatic and it
does execute Jupyter notebooks. Again at the cost of some time invested.


## Integrating and harmonizing notebooks: Jupyter Books


The point: If you travel down the Jupyter notebooks path you may wish to staple some of them together as a sort of
virtual book. For this purpose the Jupyter people have invented Jupyter Books.


## More on git: Clones in relation to Forks


The point: cf `git`. If you are working within your own code base you create the code base in some location (say on
your own computer) from a GitHub backup or canonical version using `git clone`. If on the other hand you want to begin
working from someone else's repository (and you are not on `clone` terms) you use `git fork`.


I wonder if I got that right.


## More on Jupyter 1: Commonly used Python libraries for meta-tasks

- Pickle: An easy way to share data structures across notebooks. [Here is an introductory blog.](https://betterprogramming.pub/dont-fear-the-pickle-using-pickle-dump-and-pickle-load-5212f23dbbce)
    - Notebooks tend to grow until they become unwieldy. A natural step is to break them down into smaller conceptual blocks.
    - Pickle facilitates 'picking up where the previous notebook left off'.
    - Warning: Not necessarily cross-platform
    - Rejoice: Checkpointing! Cloud cost savings!
- Up your game to JSON!
    - What's the bump? What's the drawback?

## More on Jupyter 2: Magic


The point: There is both line magic (**%**) and cell magic (**%%**) in Jupyter notebooks that will accomplish interesting and useful meta-tasks.
Simple example: Time a cell to see how long it takes to execute.


## More on Jupyter 3: Hubs, Littlest


The point: For a group of researchers it can be useful to centralize Jupyter notebook server environments as a management service.
The mechanism to do this is called a **Jupyter Hub**. However there is a simplified variation of this that is worth learning about
as well and this is called the **Littlest Jupyter Hub**. It is not twee.


## More on Jupyter 4: How the cloud plays in


The point: Much of the Jupyter notebook support we describe above can be done on one's own machine... up until we get to
large infrastructure deployments like Jupyter Hubs where a set of servers are needed. We can rent these on the cloud. The
trick is to have them automatically scale up and down according to human demand so as to minimize cost to operate. And we
want to understand how it is that they can be made reliable so that they do not lose our work. This is the persistence problem.


## Jupyter for Education

[Here](https://jupyter4edu.github.io/jupyter-edu-book/case-studies.html)


## Natural Language Processing 1: Where to begin

Now we begin to poke our nose in the door of data science sub-disciplines, often associated with forms of machine learning.


- The Jupyter environment as noted is suitable for many data science sub-disciplines. Natural Language Processing (NLP) is no exception.
    - [This tutorial video provides an excellent introduction to the topic]
    - Left off here... get some links and stuff

## Regular Expressions

A regular expression is a formalism for parsing text. Learn how to do it [here](https://regexone.com/).

## The Cloud 1: What are the key differences?

## The Cloud 2: How do I move data between clouds?

* [AWS-to-Azure via AzCopy](https://azure.microsoft.com/en-us/blog/move-your-data-from-aws-s3-to-azure-storage-using-azcopy/)
and [via Azure Data Factory](https://docs.microsoft.com/en-us/azure/data-factory/data-migration-guidance-s3-azure-storage)
* [GCP-to-Azure via AzCopy](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-google-cloud) and
[via Azure Data Factory](https://docs.microsoft.com/en-us/azure/data-factory/connector-google-cloud-storage?tabs=data-factory)
* [GCP-to-AWS](https://aws.amazon.com/blogs/big-data/migrate-terabytes-of-data-quickly-from-google-cloud-to-amazon-s3-with-aws-glue-connector-for-google-bigquery/)
* [Azure-to-AWS](https://aws.amazon.com/blogs/storage/one-way-to-migrate-data-from-azure-blob-storage-to-amazon-s3/)
* [AWS-to-GCP](https://cloud.google.com/architecture/transferring-data-from-amazon-s3-to-cloud-storage-using-vpc-service-controls-and-storage-transfer-service)
* [Azure-to-GCP](https://cloud.google.com/migrate/compute-engine/docs/4.5/how-to/migrate-azure-to-gcp/overview)
