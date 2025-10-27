# Data Server

* The premise here is: You have some data, you'd like to make it available over the Internet, how hard is this?
    * The good news is: You can be up and running with a toy example in a matter of a day
    * The reality is: Building a full-up data service you are happy with is likely to be something of a project
    * Therefore: Be sure to have a demand that justifies the time investment to build your supply
    * Let's quickly outline three approaches to consider. We elaborate on the second and third approaches below.
        * First approach: Place the data in a logical structure on the cloud and enable your "customers" to read it
            - Simplest; but your data users need to build compute environments on the cloud
        * Second approach: Place the data on the cloud and build a data service using a Web Framework
        * Third approach: Place the data on the cloud and build a data service using Serverless functions
* Web Framework approach to data as a service
    * A Web Framework is an assembly of code and libraries. We install it to publish a generic interface; and then we customize
    * A good Web Framework to read about is called Flask: It is not too complicated, nor is it too super-simple
    * A really powerful Web Framework, in contrast is Django; much bigger time investment needed to climb the learning curve
* Serverless approach to data as a service
    * Serverless compute is a simple way to build some intelligence into a data service
    * Think of serverless as "code that magically runs and I don't have to worry about the computer or the operating system"
    * To do: Provide the link to the re-tested serverless tutorial "Zero2API"
* [A blog on data science practice](https://www.authorea.com/users/3/articles/3410/_show_article) containing some useful links...
    * Data archival: [Dataverse](https://dataverse.org), [Zenodo](http://zenodo.org/), [FigShare](http://figshare.com/), [Dryad](https://datadryad.org)
    * Also links for: Research data, source code, workflow, executable publication, tools, licensing, privacy
