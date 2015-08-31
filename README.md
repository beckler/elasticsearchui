Abol Log Search
======
This site is compiled (concat + minified) into static assets.  
It uses tools developed in node.js to build the distributable.

### Installing
1. Install [node.js](https://nodejs.org/)
2. `npm install -g bower gulp` *Note: This process may need to be done in adminstrator mode*
3. `npm install` *Note: This process may need to be done in adminstrator mode*
4. `bower install`

### Running
There are several gulp commands to serve up content.

* `gulp serve` serves the site with live reload + browsersync.
* `gulp build` creates a distributable version of the site.
