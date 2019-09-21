import { PathFactory } from 'ldflex';
import ComunicaEngine from 'ldflex-comunica';
import { namedNode } from '@rdfjs/data-model';

// Provide the fcrepo4 namespace for the JSON-LD context
const context = {
  "@context": {
    "@vocab": "http://xmlns.com/foaf/0.1/",
    "friends": "knows"
  }
};

/*
 *
   "label": "http://www.w3.org/2000/01/rdf-schema#label",
    "geo": "http://www.opengis.net/ont/geosparql#",
    "geof": "http://www.opengis.net/def/function/geosparql/",

    "my": "http://example.org/ApplicationSchema#"

*/

// Provide the SPARQL endpoint for querying
//const fragmentURI = 'https://raw.githubusercontent.com/jrgriffiniii/jrgriffiniii.github.io/geosparql/geosparql-example.rdf';
const fragmentURI = 'https://ruben.verborgh.org/profile/';
//const fragmentURI = 'https://raw.githubusercontent.com/jrgriffiniii/jrgriffiniii.github.io/geosparql/geosparql-example.rdf';
const queryEngine = new ComunicaEngine(fragmentURI);

// The object that can create new paths
const pathFactory = new PathFactory({ context, queryEngine });

/**
 * Build an LDFlex query using a set of arguments
 * @param pathArgs
 * @return foo
 */
function buildPath(pathArgs) {
  return pathFactory.create(pathArgs);
}

/**
 * For a model type literal, retrieve all resources
 * @param model {string}
 * @return foo
 * @see ActiveFedora::RDF::Fcrepo::Model.hasModel
 */
export async function getResources(model) {

  /*
  const resources = buildPath({
    predicate: namedNode('info:fedora/fedora-system:def/model#hasModel'),
    object: namedNode(model)
  });
  */

  //predicate: namedNode('http://example.org/ApplicationSchema#hasPointGeometry')
  //subject: 'http://example.org/ApplicationSchema#PlaceOfInterest'

  const path = new PathFactory({ context, queryEngine });
  const ruben = path.create({ subject: namedNode('https://ruben.verborgh.org/profile/#me') });
  console.log('TRACE231');
  try{
    console.log(`Ruben: ${await ruben.name}`);
  } catch(error) {
    console.log('TRACE');
    console.log(error);
  }

  const resource = buildPath({
    subject: namedNode('https://ruben.verborgh.org/profile/#me')
  });
  console.log('TRACE32');
  console.log(`This is a ${await resource.name}`);
  //console.log(`This has the WKT literal ${resource['http://www.opengis.net/ont/geosparql#asWKT']}`);
  const resources = [resource];

  return await resources;
}

/**
 * For a subject IRI, retrieve an object stored within a specific predicate
 * @param subject
 * @param property
 * @return foo
 */
export async function getResource(subject, property) {

  // Use the IRI as the subject
  const resource = buildPath({ subject: namedNode(subject) });

  return await resource[property];
}

/**
 * For a subject IRI, retrieve the spatial information encoded in <dc:coverage>
 * @param iri
 * @return foo
 */
export async function getResourceCoverage(iri) {

  return await getResource(iri, namedNode('http://purl.org/dc/terms/coverage'));
}
