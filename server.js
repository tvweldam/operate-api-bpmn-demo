const http = require("http");
const request = require("request");

const server = http.createServer((req, res) => {

  const client_id = 'maarten'; // Replace <client id> with your actual client id
  const client_secret = ''; // Replace <secret> with your actual client secret

  const hostname = 'https://hyperautomation.34.91.213.205.nip.io' 

  fetchAccessToken(hostname, client_id, client_secret)
  .then(tokenResponse => {
      const token = tokenResponse.access_token;
      request.get(
        {
          url: `${hostname}/operate${req.url}`,
          headers: {
            /*
             * Replace COOKIE_VALUE with a valid OPERATE-SESSION cookie.
             * See https://docs.camunda.io/docs/apis-clients/operate-api/#authentication-for-self-managed-cluster for more details
             */
            //Cookie: "OPERATE-SESSION=AC00E40AE8A9D09A9444E823BD5BEA94",
            Authorization: "Bearer " + token,
          },
        },
        (error, response, body) => {
          if (error) {
            console.error(error);
            res.statusCode = 500;
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Content-Type", "application/json");
            res.end("Error: Could not get data from API");
          } else {
            res.setHeader("Content-Type", response.headers["content-type"]);
            res.setHeader("Access-Control-Allow-Origin", "*");            
            res.end(body);
          }
        },
      );
  })
  .catch(error => {
      console.log('Error in obtaining access token:', error);
  });

  
});

server.listen(3030, () => {
  console.log("Proxy server listening on port 3030");
  
});

function fetchAccessToken(hostname, client_id, client_secret){

  const url = hostname + ':443/auth/realms/camunda-platform/protocol/openid-connect/token';

  const params = new URLSearchParams();
  params.append('client_id', client_id); // Replace <client id> with your actual client id
  params.append('client_secret', client_secret); // Replace <secret> with your actual client secret
  params.append('grant_type', 'client_credentials');

  return fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error fetching access token:', error);
    throw error;
  });

}
