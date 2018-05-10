# ASD National Aggregator

This application is the receiving end of the ASD server enterprise which will aggregate the data for each National Guard AASF to the FedRamp approved Google App Engine / SQL cloud

## Getting Started

The application is deployed onto the Google Cloud Platform but can be ran locally. the current database is both the test and production data. Once fielded to the enterprise, the dbconnections.js (within the Repo) file will connect only to the test environment.  

### Prerequisites

You will need Node Packet Manager installed locally
To deploy the app to the Google Cloud Platform, you will need the GCP CLI installed


### Installing

To install this application and run locally, you will need to clone the Repo then run


```
npm -i --save
```
Once all the dependencies are added locally change directories into the Aggregator folder and run:

```
npm start
```

Because the database and application are on the Google Cloud Application, you will need to add your local IP address to the "authorized IP" within the GCP Admin console. To do this contact the Rich on this repo.


## Built With

* [node.js](http://www.nodejs.org/) - The web framework used
* [Google Apps Engine](https://cloud.google.com/appengine/) - Hosting Node.js
* [Google SQL](https://cloud.google.com/sql/docs/) - database backend


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Rich Ferguson** - *Initial work* - [Richfergus](https://github.com/richfergus)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Ariel Castro for being a constant pain in the ass?
