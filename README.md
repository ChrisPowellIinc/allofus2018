# All of Us mobile app

This is the mobile app frontend for the all of us social media network

Its built using web technologies: Javascript, HTML and css.

The UI is made using frameworks namely [Bootstrap](https://getbootstrap.com) and [onsenUI](http://onsen.io)

To get started, you should clone the repository into you system.

After cloning the repository, you should go ahead and install all the dependecies by running `$ npm install`

This will pull all the necessary packages needed to work on the application.

Now you have to install all the platforms and plugins for the app. This step is very important because these platforms and plugins are not pushed to the repository because they can get very large. Run this command to install all the platforms and plugins:

`$ cordova prepare`

You can start the app for development by opening two different terminals;

In the first one, you should start webpack by running:

`$ npm start`

This will compile all javascript sources to one bundled file in `www/js/index-bundle.js`

To see what you are developing you will have to serve the code from the `platforms/browser` folder. But the files there do not automatically update when you are developing. you will need a file watcher to update the folder documents when a file you are working on changes.

Use [modd](https://github.com/cortesi/modd) to do the watching. I have included the configuration file needed for modd to run. Visit the github repository and follow the instruction to install it on your system. After installing it, run the command `$ modd` on the second terminal you have opened and on the root folder where this app is located and it will watch your file system, and any changes you make to the javascript files will be updated in the android and browser platforms folders.

