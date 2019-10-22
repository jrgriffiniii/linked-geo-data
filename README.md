# Linked Geospatial Data Portal

## About

This is a [React]() and [Redux]() application developed to demonstrate what can be done
with geospatial linked data. While any graph store can be used in order to
provide a data source, [Ontotext GraphDB]() is the preferred solution, as it offers
comprehensive support for the [W3C GeoSPARQL]() specification.

The structure of the RDF graphs are quite opinionated as well, and assumes that
one is indexing data from a [Fedora Commons](), using a [Hyrax repository]()
implementation. As such, this is considered a solution for the Samvera
repository stack.

## Getting Started

One will first need to deploy a Fedora Commons installation which synchronizes
with an installation of GraphDB (or another graph store). An example approach 
for this using [Docker]() can be found at [https://github.com/jrgriffiniii/linked-geo-data-docker].

Following this deployment, one simply starts the server within a local
development environment by invoking the following:

```bash
% REACT_APP_SPARQL_URL=http://localhost:7200/repositories/fcrepo yarn start
```

Please note that, should your GraphDB repository be `fcrepo`, and the
installation be available at `http://localhost:7200`, that this is the default
SPARQL endpoint URL.  Hence, one could simply issue:

```bash
% yarn start
```

## React
_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  To learn more about React, please check out the [React documentation](https://reactjs.org/)._

### Available Scripts

In the project directory, you can run:

#### `yarn start` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `yarn test` or `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).


#### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

# Help

The Samvera community is here to help. Please see our [support 
guide](./SUPPORT.md).

# Acknowledgments

This software has been developed by and is brought to you by the Samvera
community.  Learn more at the [Samvera website](http://samvera.org/).

![Samvera Logo](https://wiki.duraspace.org/download/thumbnails/87459292/samvera-fall-font2-200w.png?version=1&modificationDate=1498550535816&api=v2)
