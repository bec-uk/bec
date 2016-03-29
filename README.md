# Bristol Energy Coop - Monitoring Tool

Built by [SpiralEdge](http://www.spiraledge.co.uk).

Based on Flatlogic's [Angular Material Dashboard](http://flatlogic.github.io/angular-material-dashboard/).

## Getting started

Clone project:

    $ git clone https://github.com/spiraledgeuk/bec.git

Install dependencies: (you must have node package manager installed https://www.npmjs.com/)

    $ cd <dir>
    $ sudo npm install -g bower
    $ sudo npm install -g gulp
    $ npm install

Install gem 'sass' - for css compilation

    $ sudo gem install sass
    
Run development web-server:

    $ gulp serve

Build standalone version in /dist
  
    $ gulp build

Deploy to server (with correct permissions)
  
    $ gulp build
    $ gulp deploy

## Simtricity API key

To retrieve data from Simtricity an API key/access token is required.  This should be stored in a file called 'simtricity_token.txt'.  This file should be placed in the same directory as the PHP proxy script, as this is what reads the file and inserts the token as needed.  This file should not be readable over the Internet (it should not be served if a web-server client requests it).

## Proxy Setup

The project currently depends on a proxy server to access the simtricity API and overcome cross-domain issues. The proxy is currently written in PHP so requires a PHP server to work. The proxy-local.php (in the project root) server must currently be available at http://simtricity_proxy.local:8888. This hard-coded address can be altered in /src/app/services/ReadingService.js

When the standalone project is built it includes the appropriate proxy server which will work as long as the files are deployed on a PHP server.

This system should be improved in future versions.

## Note about Routing/HTML5 Push States

For Angular Routing to function correctly within a Single Page Application all requests should be directed to index.html. This is accomplished with configuration of the lightweight Node-based server which is a dependency of the project. The /src dir also includes a .htaccess file to satisfy the same requirement when the built app is deployed on apache/PHP.
