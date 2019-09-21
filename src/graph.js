import fetch from 'isomorphic-fetch'

// Provide the SPARQL endpoint for querying
const sparqlURL = 'http://localhost:7200/repositories/test1';

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
function query(sparqlQuery) {
  const formats = 'application/sparql-results+json';
  const postData = `query=${encodeURIComponent(sparqlQuery)}&infer=true&sameAs=true`
  const query = fetch(sparqlURL, {
    headers: {
      'Accept': formats,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: postData
  });

  const body = query.then( (response) => { return response.text(); } );
  return body;
}

export async function getResources(model) {
  //predicate: namedNode('http://example.org/ApplicationSchema#hasPointGeometry')
  //subject: 'http://example.org/ApplicationSchema#PlaceOfInterest'

  let works = [];
  let sparql;
  const sparqlQuery = 'SELECT * WHERE { ?subject a <http://pcdm.org/models#Work> }';
  const response = await query(sparqlQuery);
  try {
    sparql = JSON.parse(response);
  } catch(error) {
    console.error(error.message);
    console.error(response);
    return works;
  }

  const results = sparql['results'];
  const bindings = results['bindings'];
  for (const binding of bindings) {
    const subject = binding['subject'];
    // This should be structured into a different function
    let work = {};
    work.id = subject['value'];
    works.push(work);
  }

  return works;
}
/**
 * For a subject IRI, retrieve an object stored within a specific predicate
 * @param subject
 * @param property
 * @return foo
 */
export function getResource(subject, property) {

  // Fix this
  return null;
}

/**
 * For a subject IRI, retrieve the spatial information encoded in <dc:coverage>
 * @param iri
 * @return foo
 */
export async function getResourceCoverage(iri) {

  return await getResource(iri, namedNode('http://purl.org/dc/terms/coverage'));
}
