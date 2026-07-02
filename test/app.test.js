const request = require('supertest');
const { app, server } = require('../index');

afterAll(() => {
  server.close();
});

describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Welcome to Node.js Demo API');
    expect(res.body.status).toBe('running');
  });
});

describe('GET /health', () => {
  it('should return healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('uptime');
  });
});

describe('GET /users', () => {
  it('should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.count).toBeGreaterThan(0);
  });
});

describe('GET /users/:id', () => {
  it('should return a single user', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(1);
    expect(res.body.data).toHaveProperty('name');
    expect(res.body.data).toHaveProperty('email');
  });

  it('should return 404 for non-existing user', async () => {
    const res = await request(app).get('/users/999');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('User not found');
  });
});

describe('POST /users', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Charlie', email: 'charlie@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Charlie');
    expect(res.body.data.email).toBe('charlie@example.com');
  });

  it('should return 400 if name is missing', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'noname@example.com' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Name and email are required');
  });

  it('should return 400 if email is missing', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'NoEmail' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('PUT /users/:id', () => {
  it('should update an existing user', async () => {
    const res = await request(app)
      .put('/users/1')
      .send({ name: 'Alice Updated' });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Alice Updated');
  });

  it('should return 404 for non-existing user', async () => {
    const res = await request(app)
      .put('/users/999')
      .send({ name: 'Ghost' });
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe('DELETE /users/:id', () => {
  it('should delete an existing user', async () => {
    const res = await request(app).delete('/users/2');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('User deleted');
  });

  it('should return 404 for non-existing user', async () => {
    const res = await request(app).delete('/users/999');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe('Unknown route', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Route not found');
  });
});