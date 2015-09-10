ElasticSearch UI [![Build Status](https://travis-ci.org/beckler/elasticsearchui.svg?branch=master)](https://travis-ci.org/beckler/elasticsearchui)
======
This is a site designed as a light UI layer to take advangate of [ElasticSearch](https://www.elastic.co/products/elasticsearch)'s rest APIs.

It's designed to work out-of-the-box with [logstash](https://www.elastic.co/products/logstash).

This site compiles down (concat + minified) into static assets.
It uses tools developed in node.js to build the distributable.

It uses [Swiip's](https://github.com/Swiip) excellent [gulp-angular yeoman generator](https://github.com/Swiip/generator-gulp-angular).

### Installing
1. Install [node.js](https://nodejs.org/)
2. `npm install -g bower gulp`
3. `npm install` *Note: If on Windows, this process may need to be done in adminstrator mode*
4. `bower install`

### Configuring
The only values you'll need to modify are in the [index.constants.js](https://github.com/beckler/elasticsearchui/blob/master/src/app/index.constants.js) file.

* `ES_URL` The url + port to the elasticsearch instance.

### Running
There are several gulp commands to serve up content.

* `gulp serve` serves the site with live reload + browsersync.
* `gulp serve:dist` serves the compiled and minified version of the site with browsersync.
* `gulp clean` cleans up all rendered files.
* `gulp build` creates a distributable version into `/dist` in the project root directory.

### Known Issues
* This site does not implement every API available to elasticsearch.
* Also, there are no completed tests, because I'm lazy.

If there is a feature you'd like, please file an issue.
