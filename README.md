# Bristol Energy Coop - Monitoring Tool

Built by [SpiralEdge](http://www.spiraledge.co.uk).

Based on Flatlogic's [Angular Material Dashboard](http://flatlogic.github.io/angular-material-dashboard/).

## Getting started

Clone project:

    $ git clone git@bitbucket.org:timbarker/bec.git

Install dependencies: (you must have node package manager installed https://www.npmjs.com/)

    $ cd <dir>
    $ npm install

Install gem 'sass' - for css compilation

    $ gem install sass
    
Run development web-server:

    $ gulp serve

Build standalone version in /dist
  
    $ gulp build

Deploy to server (with correct permissions)  
  
    $ gulp build
    $ gulp deploy

## Proxy Setup

The project currently depends on a proxy server to access the simtricity API and overcome cross-domain issues. The proxy is currently written in PHP so requires a PHP server to work. The proxy-local.php (in the project root) server must currently be available at http://simtricity_proxy.local:8888. This hard-coded address can be altered in /src/app/services/ReadingService.js

When the standalone project is built it includes the appropriate proxy server which will work as long as the files are deployed on a PHP server.

This system should be improved in future versions.

## Note about Routing/HTML5 Push States

For Angular Routing to function correctly within a Single Page Application all requests should be directed to index.html. This is accomplished with configuration of the lightweight Node-based server which is a dependency of the project. The /src dir also includes a .htaccess file to satisfy the same requirement when the built app is deployed on apache/PHP.