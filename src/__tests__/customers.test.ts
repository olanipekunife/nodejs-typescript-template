//process.env.NODE_ENV = 'production';
//process.env.MONGODB_URI = 'mongodb://127.0.0.1/spottest';

import { get, post, patch, deletes } from "../utils/supertestrequest";
import app from "../app";

// const demoUser = {
//   email: 'sola@gmail.com',
//   password: '123456',
// };

beforeAll(async (done) => {
  // login
  // return initializeCityDatabase();
  // const { body } = await post(app, '/api/login', token, demoUser);
  // token = body.data.token;
  done();
});

describe("Customers", () => {
  it("should be true", () => {
    //   const response = await deletes(app, `/api/`, `Bearer ${token}`)
    //   .expect(200);
    // expect(response.body.status).toMatch('success');
    expect(15).toBe(15);
  });
  it(" should be true", () => {
    expect(5).toBe(5);
  });
});
