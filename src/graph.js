import { NamespaceManagerInstance, NQuad, RemoteSparqlEndpoint } from 'rdflib-ts';

// Register prefix to use in application scope
NamespaceManagerInstance.registerNamespace('ex', 'http://example.org#');
// Apache Jena Fuseki server running on localhost:3030
// There is TestStore created on server
// Provide the SPARQL endpoint for querying
//const sparqlURL = 'https://raw.githubusercontent.com/jrgriffiniii/jrgriffiniii.github.io/geosparql/geosparql-example.rdf';

const sparqlURL = 'http://localhost:7200/repositories/test1/statements';
//https://raw.githubusercontent.com/jrgriffiniii/jrgriffiniii.github.io/geosparql/geosparql-example.rdf';

// This uses https://github.com/eddieantonio/node-sparql-client
const remoteEndpoint = new RemoteSparqlEndpoint('test1', sparqlURL);

/*
 *
   "label": "http://www.w3.org/2000/01/rdf-schema#label",
    "geo": "http://www.opengis.net/ont/geosparql#",
    "geof": "http://www.opengis.net/def/function/geosparql/",
    "my": "http://example.org/ApplicationSchema#"
*/

/**
 * For a model type literal, retrieve all resources
 * @param model {string}
 * @return foo
 * @see ActiveFedora::RDF::Fcrepo::Model.hasModel
 */
export async function getResources(model) {
  //predicate: namedNode('http://example.org/ApplicationSchema#hasPointGeometry')
  //subject: 'http://example.org/ApplicationSchema#PlaceOfInterest'

  const resources = [];
  try {
    // Insert a quad into the graph store
    const newQuad = new NQuad('ex:Alice', 'ex:knows', 'ex:Bob');
    remoteEndpoint.importQuadsAsync([newQuad]);

    const sparqlQuery = 'SELECT * WHERE { ?subject ?predicate ?object }';
    let queryResult;
    try {
      queryResult = remoteEndpoint.queryAsync(sparqlQuery);
    } catch (queryError) {
      console.error(queryError.message);
      return resources;
    }

    if (!queryResult.results) {
      return resources;
    }
    console.log('trace3');

    console.log('TRACE11');
    for (let result of queryResult.results.bindings) {
      console.log(result.subject.value);
      console.log(result.predicate.value);
      console.log(result.object.value);

      // Construct the Resource and add it here
      resources.append({ subject: result.subject.value });
    }
  } catch (error) {
    console.log('TRACE10');
    console.error(error.message);
  }

  return await resources;
}

/**
 * For a subject IRI, retrieve an object stored within a specific predicate
 * @param subject
 * @param property
 * @return foo
 */
export async function getResource(subject, property) {

  // Fix this
  return await {};
}

/**
 * For a subject IRI, retrieve the spatial information encoded in <dc:coverage>
 * @param iri
 * @return foo
 */
export async function getResourceCoverage(iri) {

  return await getResource(iri, namedNode('http://purl.org/dc/terms/coverage'));
}
