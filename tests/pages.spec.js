import request from 'supertest';
import app from '../files/main.js';

test('home page shows list of movies', async () =>{
const response = await request(app)
.get('/')
.expect(200);
});

test('moviepages shows movie details', async () =>{
    const response = await request(app)
    .get('/movies/1')
    .expect(200);

    expect(response.text.includes('Shawshank')).toBeTruthy();
});
test('moviepages shows movie details', async () =>{
    const response = await request(app)
    .get('/movies/8')
    .expect(200);

    expect(response.text.includes('Idiocracy')).toBeTruthy();
});