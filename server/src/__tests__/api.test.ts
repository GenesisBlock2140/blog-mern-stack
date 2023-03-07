import 'jest'
import { config } from "dotenv"
import * as request from "supertest";
config();

const HOST:string = "http://localhost:5000"

describe('GET METHOD API: get one or all posts', () => {
  it('should return all posts (9)', async () => {
    const result = await request.default(HOST).get("/posts");
    expect(result.body.length).toEqual(9);
    expect(result.statusCode).toEqual(200);
  })

  it('should return a 200 and Post title', async () => {
    const result = await request.default(HOST).get("/posts/640768d5173ae568b0489f0b");
    expect(result.body.title).toEqual("this is a cool title");
    expect(result.statusCode).toEqual(200);
  })

  it('should return 404 status', async () => {
    const result = await request.default(HOST).get("/posts/640768d5173ae568b0489f09");
    expect(result.statusCode).toEqual(404);
  })

  it('should return 200 status and fails to match the required pattern text', async () => {
    const result = await request.default(HOST).get("/posts/640768d5173ae568b0489fuu");
    expect(result.statusCode).toEqual(200);
    expect(result.text).toEqual('"id" with value "640768d5173ae568b0489fuu" fails to match the required pattern: /^[0-9a-fA-F]{24}$/');
  })

})

describe('POST METHOD API: create one post', () => {
  it('should return 404 status', async () => {
    const result = await request.default(HOST).post("/posts/640768d5173ae568b0489f0b");
    expect(result.statusCode).toEqual(404);
  })

  it('should return warn missing title', async () => {
    const result = await request.default(HOST).post("/posts").send({
      "description": "this is a cool description of blog",
      "author": "Matt"
    });
    expect(result.statusCode).toEqual(200);
    expect(result.text).toEqual('"title" is required')
  })

  it('should return warn missing description', async () => {
    const result = await request.default(HOST).post("/posts").send({
      "title": "this is a cool title",
      "author": "Matt"
    });
    expect(result.statusCode).toEqual(200);
    expect(result.text).toEqual('"description" is required')
  })

  it('should return warn missing author', async () => {
    const result = await request.default(HOST).post("/posts").send({
      "title": "this is a cool title",
      "description": "this is a cool description"
    });
    expect(result.statusCode).toEqual(200);
    expect(result.text).toEqual('"author" is required')
  })

  it('should return warn title too short', async () => {
    const result = await request.default(HOST).post("/posts").send({
      "title": "aaa",
      "description": "this is a cool description",
      "author": "Matt"
    });
    expect(result.statusCode).toEqual(200);
    expect(result.text).toEqual('\"title\" length must be at least 10 characters long')
  })

})
