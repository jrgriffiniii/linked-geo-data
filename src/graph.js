import fetch from 'isomorphic-fetch'
import wkt from 'terraformer-wkt-parser';

// Provide the SPARQL endpoint for querying
const sparqlURL = process.env.REACT_APP_SPARQL_URL || 'http://localhost:7200/repositories/fcrepo';

// Convert the WKT into GeoJSON
function parseWKT(geoSparqlWKT) {
  // Terraformer does *not* parse CRS assertions
  const wktWithoutCrs = geoSparqlWKT.replace('<http://www.opengis.net/def/crs/OGC/1.3/CRS84>', '');
  return wkt.parse(wktWithoutCrs);
};

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

  const body = query.then(response => response.text());
  return body;
}

function buildWork(queryResult) {
  const work = {};
  const subject = queryResult['subject'];
  const model = queryResult['model'];
  const title = queryResult['title'];
  const abstract = queryResult['abstract'];
  const coverage = queryResult['coverage'];

  // This should be structured into a different function
  work.id = subject['value'];
  work.model = model['value'];
  work.title = title['value'];

  // Optional properties
  if (abstract) {
    work.abstract = abstract['value'];
  }

  if (coverage) {
    work.coverage = coverage['value'];
    work.geoJSON = parseWKT(work.coverage);
  }

  return work;
}

function buildWorks(queryResults) {
  const works = [];
  const bindings = queryResults['bindings'];

  for (const binding of bindings) {
    const work = buildWork(binding);
    works.push(work);
  }

  return works;
}

function parseBoundingBox(boundingBox) {
  return wkt.convert(boundingBox);
}

function buildSparqlQuery(boundingBox, model) {
  const wktLiteral = parseBoundingBox(boundingBox);
  const sparqlQuery = `
    PREFIX geo: <http://www.opengis.net/ont/geosparql#>
    PREFIX geof: <http://www.opengis.net/def/function/geosparql/>
    PREFIX fcrepo: <info:fedora/fedora-system:def/model#>
    PREFIX dc11: <http://purl.org/dc/elements/1.1/>
    PREFIX dc: <http://purl.org/dc/terms/>
    PREFIX hydra: <http://projecthydra.org/works/models#>

    SELECT *
    WHERE {
      ?subject a hydra:Work ;
        fcrepo:hasModel ?model ;
        dc:title ?title ;
        dc11:coverage ?coverage .
      OPTIONAL {
        ?subject  dc11:description  ?abstract
      }
      FILTER (geof:sfWithin(?coverage, '''
        <http://www.opengis.net/def/crs/OGC/1.3/CRS84>
          ${wktLiteral}
        '''^^geo:wktLiteral))
    }
  `;

  return sparqlQuery;
}

export async function getResources(boundingBox, model) {
  let works = [];
  let sparql;
  const sparqlQuery = buildSparqlQuery(boundingBox);
  const response = await query(sparqlQuery);
  try {
    sparql = JSON.parse(response);
  } catch(error) {
    console.error(error.message);
    console.error(response);
    return works;
  }

  const results = sparql['results'];
  works = buildWorks(results);

  return works;
}
