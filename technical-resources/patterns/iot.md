
# Internet of Things and High-Availability Services

Research that utilizes remote-sensing devices or mobile apps that need to communicate back to a central server can be run very cost-effectively in the cloud; indeed, in a sense it's what the cloud was built for! The benefits of this include not having to manage and maintain the physical availabiltiy of the computers running your web server, and being able to use pre-built web app services provided by various cloud platforms.


Here are a few aspects of IoT that the cloud can help with:
- Publishing a REST API
- Providing '*serverless*' solutions to make that API available at minimal cost to you
- Keeping a backed up database to store information sent through the API

This work can overlap substantially with [Science Gateways](./gateways), so it may be worth checking out our resources for those as well.

## APIs

A REST API is a clearly defined way to allow computers and IoT devices to interact with a central server you manage by means of the same URLs we use to visit websites (eg, something likehttps://department.myinstitution.edu/~user/experiment/add/datapoint).

Here are some guides on how to design APIs. Even though they're published by specific cloud vendors, their information is broadly applicable regardless of platform:

- [Azure API Design Guide](https://azure.microsoft.com/mediahandler/files/resourcefiles/api-design/Azure_API-Design_Guide_eBook.pdf) (PDF)
- [(AWS) How to Architect APIs for Scale and Security](https://aws.amazon.com/blogs/architecture/how-to-architect-apis-for-scale-and-security/)
- [RESTFUL APIs Best Practices - Google Cloud Apigee](https://cloud.google.com/apigee/resources/ebook/web-api-design-register/?int_source=website&int_medium=resources&int_campaign=ebook&int_content=web-api-design-ebook) (ebook)

## Serverless

Rather than leaving a VM running as a server to respond to API requests, most cloud platforms offer "serverless" functionality which lets you provide code that should be run when the API is accessed, but outside of those requests doesn't consume billable resources. This is similar to the batch job submission systems clouds provide for HPC, but for tiny workloads instead of huge ones; when a remote computer makes a request to your service, a tiny compute server is spun up, responds to the request, and then is deleted automatically. Persistent data can be stored as files or a database.

Here are guides to getting started with serverless resources on various cloud platforms:

- [CloudBank Data Server Solution](../solutions/cbs-data-server.md)
- AWS
    - [Building an API with AWS Lambdas](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)
    - [Building an API with containers](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-private-integration.html)
- Azure
    - [Build Serverless APIs with Azure Functions](https://docs.microsoft.com/en-us/learn/modules/build-api-azure-functions/)
- GCP
    - [Cloud Function tutorials](https://cloud.google.com/functions/docs/tutorials)
- IBM
    - [Serverless Web Application Tutorial](https://cloud.ibm.com/docs/solution-tutorials?topic=solution-tutorials-serverless-api-webapp)

## Case studies
## Case studies

- [BALTO: Public Transit Monitoring in Baltimore](https://www.cloudbank.org/training/rroccet21-public-transit-monitoring-baltimore): Dr. Vanessa Frias-Martinez uses the cloud to host the back-end servers of a mobile app crowdsourcing public transit monitoring in Baltimore.
- [Rush University Medical Center: Transforming healthcare experiences](https://cloud.google.com/customers/rush-university-medical-center): Rush University Medical Center used GCP's API services to build better electronic record and wellness apps for their patients.
