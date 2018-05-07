# Kiumi

One Paragraph of project description goes here

## Getting Started

### Prerequisites

#### NodeJS
##### Windows: 
https://nodejs.org/en/
##### Mac:
```
brew install npm
```

#### Ionic Cordova
```
npm install -g ionic cordova
```

### Installing

Clone this repo and navigate to the newly created folder
```
git clone https://www.github.com/sahmed1997/Kiumi
```

To install all the dependencies for the project, run: 
```
npm install
```

#### Deploying locally
To deploy the app in your browser you will have to run:
```
ionic serve
```
When it finishes your browser should open automatically. If it doesn't, Kiumi will be running on ```http://localhost:8100``` by default.

#### Deploying to a device
First, you will need to add the desired platform to the project. You can do this by running 
```
ionic cordova platform add [platform]
``` 
Where ```[platform]``` can be ```ios```, ```android``` or ```windows```. Then run
```
ionic cordova run [platform]
```
which will run your app and deploy it on your device in debug mode.

## Built With

* [Ionic](https://ionicframework.com/) - Framework
* [Firebase](https://firebase.google.com/) - Database
* [rxjs](http://reactivex.io/) - Asynchronous calls
* [Moment.js](https://momentjs.com/) - Date handling

## Authors

* **Salman Ahmed** - *Project manager*
* **Juan David Garrido** - *Development manager*
* **Raza Khalid** - *UI/UX Design*
* **David Peletz** - *Developer and tester*


See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
