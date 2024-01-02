import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


// Test: Adding a user to the database

const mockadapter = new MockAdapter(axios);

test("Test: Adding a user to the database", () => {

    const jsonData = {
        username: 'testUser',
        email: 'test@example.com',
        passwd: 'testpass'
    };


    mockadapter.onPost('http://localhost:1337/user').reply(200, {});

    return axios.post('http://localhost:1337/user', jsonData).then((res) => {
        expect(res.status).toBe(200);
    })
    
})