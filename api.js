async function fetchDiagram() {
  return fetch(
    // Replace PROCESS_DEFINITION_ID with a process definition id
    "http://localhost:3030/v1/process-definitions/2251799815678190/xml",
    {
      method: "GET",
    },
  ).then((response) => response.text());
}

async function fetchStatistics() {
  return fetch(
    // Replace PROCESS_INSTANCE_ID with a process instance id
    "http://localhost:3030/v1/process-instances/2251799816359826/statistics",
    {
      method: "GET",
    },
  ).then((response) => response.json());
}

async function fetchSequenceFlows() {
  return fetch(
    // Replace PROCESS_INSTANCE_ID with a process instance id
    "http://localhost:3030/v1/process-instances/2251799816359826/sequence-flows",
    {
      method: "GET",
    },
  ).then((response) => response.json());
}
