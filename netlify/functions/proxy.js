import fetch from "node-fetch";

export async function handler(event) {
  const path = event.queryStringParameters.path;

  if (!path) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing path query parameter" }),
    };
  }

  const url = `http://server-nodejs.cit.byui.edu:3000/${path}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
