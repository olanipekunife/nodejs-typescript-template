import request from "supertest";

// a helper function to make a POST request
const origin = "http://localhost:8080";

const post = (app, url, token, body) => {
  const httpRequest = request(app).post(url);
  httpRequest.send(body);
  httpRequest.set("Authorization", token);
  httpRequest.set("Accept", "application/json");
  httpRequest.set("Origin", origin);
  return httpRequest;
};

const get = (app, url, token, body) => {
  const httpRequest = request(app).get(url);
  httpRequest.set("Authorization", token);
  httpRequest.set("Accept", "application/json");
  httpRequest.set("Origin", origin);
  return httpRequest;
};

const patch = (app, url, token, body) => {
  const httpRequest = request(app).patch(url);
  httpRequest.send(body);
  httpRequest.set("Authorization", token);
  httpRequest.set("Accept", "application/json");
  httpRequest.set("Origin", origin);
  return httpRequest;
};

const deletes = (app, url, token, body) => {
  const httpRequest = request(app).delete(url);
  httpRequest.send(body);
  httpRequest.set("Authorization", token);
  httpRequest.set("Accept", "application/json");
  httpRequest.set("Origin", origin);
  return httpRequest;
};
export { post, get, patch, deletes };
