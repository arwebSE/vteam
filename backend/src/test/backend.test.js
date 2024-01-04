import axios from "axios"

describe("User tests", () => {

    test("Adding a user", async() => {

        var username = "username"
        var email = "email@example.com"
        var passwd = "passwd"

        const jsonData = {
            username: username,
            email: email,
            passwd: passwd
        };


        // Send a POST request to your API endpoint
        const response = await fetch('http://localhost:1337/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(jsonData)
        });
        expect(response.status).toBe(201);



    })


    test("Getting all users", async() => {
        const response = await axios.get('http://localhost:1337/user');
        expect(response.status).toBe(200);
        console.log(response.data);
    })

    test("Getting one user", async() => {
        const response = await axios.get('http://localhost:1337/user/1');
        expect(response.status).toBe(200);
        console.log(response.data);
    })

    test("Deleting a user", async() => {


        // Send a POST request to your API endpoint
        const response = await fetch('http://localhost:1337/user/1', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
        });
        expect(response.status).toBe(200);


    });


})


describe("City tests", () => {

    test("Adding a city", async() => {

        var cityName = "Sollentuna"
        var lat = "59.26387"
        var long = "17.5537"

        const jsonData = {
            id: cityName,
            lat: parseFloat(lat),
            lon: parseFloat(long)
        };


        // Send a POST request to your API endpoint
        const response = await fetch('http://localhost:1337/city', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(jsonData)
        });
        expect(response.status).toBe(201);




    })


    test("Getting all cities", async() => {
        const response = await axios.get('http://localhost:1337/city');
        expect(response.status).toBe(200);
        console.log(response.data);
    })

    test("Getting a city", async() => {
        const response = await axios.get('http://localhost:1337/city/Sollentuna');
        expect(response.status).toBe(200);
        console.log(response.data);
    })

    test("Deleting a city", async() => {


        // Send a POST request to your API endpoint
        const response = await fetch('http://localhost:1337/city/Sollentuna', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
        });
        expect(response.status).toBe(200);


    });


})