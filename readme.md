### This guide will let you install karma and jasmine from scratch. Follow through with the other webpack guide:

http://www.hughsherman.com/webpack-guide.html

1. Add more dev tools like jquery:

    $ npm install jquery --save

    src/main.js
    ---------
    import $ from 'jquery';

    Or like bootstrap:

    $ npm install popper.js --save
    $ npm install bootstrap --save

    src/main.js
    ----------
    import 'bootstrap';

2. Install Jasmine's core module:

    $ npm install jasmine-core@2.99.0 --save-dev

    helper command:
    $ npm install jasmine@3.1.0 --save-dev

3. Initialize Jasmine:

    $ ./node_modules/.bin/jasmine init

4. Update your package.json to include a command to run jasmine:

    package.json
    ----------
    "scripts": {
      "build": "webpack",
      "test": "jasmine"

    ### Remember to add a comma between these commands!!! Otherwise
        your whole thing could break!!!

5. Install Karma, which is a separate package that runs the tests
   that you write for Jasmine!

   $ npm install karma@2.0.0 --save-dev
   $ npm install karma-jasmine@1.1.1 --save-dev
   $npm install karma-webpack --save-dev

   This installs the chrome spec viewer:
   $ npm install karma-chrome-launcher@2.2.0 --save-dev

   This installs global karma commands:
   $ npm install karma-cli@1.0.1 -g

   This installs your copy of Karma for the webpack!
   $ npm install karma-cli@1.0.1 --save-dev

   This makes Karma not freak out about Jquery!
   $ npm install karma-jquery@0.2.2 --save-dev

   This makes Karma look nice in the window!
   $ npm install karma-jasmine-html-reporter@0.2.2 --save-dev

   This runs webpack, but lets Karma automatically use source mapping.
   $ npm install karma-sourcemap-loader@0.3.7 --save-dev

   This installs eslint, which you need for the test on Friday:
   $ npm install eslint@4.18.2 --save-dev
   $ npm install eslint-loader@2.0.0 --save-dev

   You also need an .eslintrc file, this just holds rules for ESLint and goes in the top level directory:
   .eslintrc
   ----------------------------------

   {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "extends": "eslint:recommended",
    "env": {
      "es6": true,
      "browser": true,
      "jquery": true
    },
    "rules": {
        "semi": 1,
        "indent": ["warn", 2]
    }
}

   Add this to the package.json file under the "scripts" section, and make sure to add a comma after the previous item in the list:

   "lint": "eslint src/*.js"

6. Congrats! You have good Karma! Now run the config command!

   $ karma init karma.conf.js

7. Edit your newly created karma.conf.js file, and replace it with this version:

   COPY BELOW
   ******************************************


   // Karma configuration
   // Generated on Wed Jun 26 2019 09:18:52 GMT-0700 (PDT)
   const webpackConfig = require('./webpack.config.js');

   module.exports = function(config) {
     config.set({

       // base path that will be used to resolve all patterns (eg. files, exclude)
       basePath: '',


       // frameworks to use
       // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
       frameworks: ['jquery-3.2.1','jasmine'],


       // list of files / patterns to load in the browser
       files: [
         'src/*.js',
         'spec/*spec.js'
       ],

       webpack: webpackConfig,

       // list of files / patterns to exclude
       exclude: [
       ],


       // preprocess matching files before serving them to the browser
       // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
       preprocessors: {
         'src/*.js': ['webpack', 'sourcemap'],
         'spec/*spec.js': ['webpack', 'sourcemap']
       },

       plugins: [
         'karma-jquery',
         'karma-webpack',
         'karma-jasmine',
         'karma-chrome-launcher',
         'karma-jasmine-html-reporter',
         'karma-sourcemap-loader'
       ],


       // test results reporter to use
       // possible values: 'dots', 'progress'
       // available reporters: https://npmjs.org/browse/keyword/karma-reporter
       reporters: ['progress', 'kjhtml'],


       // web server port
       port: 9876,


       // enable / disable colors in the output (reporters and logs)
       colors: true,


       // level of logging
       // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
       logLevel: config.LOG_INFO,


       // enable / disable watching file and executing tests whenever any file changes
       autoWatch: true,


       // start these browsers
       // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
       browsers: ['Chrome'],


       // Continuous Integration mode
       // if true, Karma captures browsers, runs the tests and exits
       singleRun: false,

       // Concurrency level
       // how many browser should be started simultaneous
       concurrency: Infinity
     })
   }


   ******************************************
   COPY ABOVE

8. Change your "test" command in package.json to the new Karma command:

    "scripts": {
      "build": "webpack",
      "test": "./node_modules/karma/bin/karma start karma.conf.js"
    },


# NOTE THAT THIS TEST PATH DOES NOT WORK ON A WINDOWS COMPUTER!!!
	I had to use this alternate test command instead:
	"test": "node ./node_modules/karma/bin/karma start karma.conf.js"



9. Exclude specs from ESLint, so that your thing still builds.

### QUICK NOTE! I didn't use ES Lint in any of my stuff because it's a bit of a mystery
to me, and keeps breaking my builds. If anyone has a solution,
I'd love to look at it!!


    Add this:

      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /spec/
        ],
        loader: "eslint-loader"
      },


      -----------------

      webpack.config.js
      -----------------
      // stuff up here
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: [
              /node_modules/,
              /spec/
            ],
            loader: "eslint-loader"
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          }
        ]
      }
      // maybe some stuff down here

--------------------------------

SAMPLE TESTS!!

// in our sudoku.js file, we defined a puzzle object and constructor
   so we imported them into this test page to run the functions

import { myPuzzle, SudokuPuzzle } from './../src/sudoku.js'


describe ('sudoku', function(){
  it ('should test whether something is or is not a number', function(){
    myPuzzle.numberCheck();
    expect(myPuzzle.valid).toEqual(true);
  });

  it('should tell whether an array has unique rows numbers 1-9', function(){
      myPuzzle.uniqueRowCheck();
      expect(myPuzzle.valid).toEqual(true);
  });

  it('should tell whether an array has unique columns numbers 1-9', function(){
      myPuzzle.uniqueColCheck();
      expect(myPuzzle.valid).toEqual(true);
  });



});
