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


        // Post
        const response = await fetch('http://localhost:1337/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        expect(response.status).toBe(201);



    })

    test("Updating a user", async() => {


        var username = "newusername"
        var email = "newemail@example.com"

        const jsonData = {
            username: username,
            email: email,
        };


        // Post
        const response = await fetch('http://localhost:1337/user/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
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

    test("Getting a user", async() => {
        const response = await axios.get('http://localhost:1337/user/1');
        expect(response.status).toBe(200);
        console.log(response.data);
    })

    test("Deleting a user", async() => {


        // Send a POST request to your API endpoint
        const response = await fetch('http://localhost:1337/user/1', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
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

        // Post request
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


        // Delete request
        const response = await fetch('http://localhost:1337/city/Sollentuna', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
        });
        expect(response.status).toBe(200);


    });


})




describe("Scooter tests", () => {

    test("Adding a scooter", async() => {

        var lat = "59.26387"
        var long = "17.5537"
        var battery = "34.4"
        var status = "free"
        var city_cityid = "1"

        const jsonData = {
            lon: parseFloat(long),
            lat: parseFloat(lat),
            battery: parseFloat(battery),
            status: status,
            city_cityid: parseInt(city_cityid)
        };

        // Post request
        const response = await fetch('http://localhost:1337/scooter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(jsonData)
        });
        expect(response.status).toBe(201);




    })

    test("Updating a scooter", async() => {

        var lat = "59.26387"
        var long = "17.5548"
        var battery = "27.4"
        var status = "free"
        var city_cityid = "1"

        const updateData = {
            lon: parseFloat(long),
            lat: parseFloat(lat),
            battery: parseFloat(battery),
            status: status,
            city_cityid: parseInt(city_cityid)
        };

        // Post request
        const updateResponse = await fetch('http://localhost:1337/scooter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(updateData)
        });
        expect(updateResponse.status).toBe(201);




    })



    test("Getting all scooters", async() => {
        const response = await axios.get('http://localhost:1337/scooter');
        expect(response.status).toBe(200);
        console.log(response.data);
    })

    test("Getting a scooter", async() => {
        const response = await axios.get('http://localhost:1337/scooter/1');
        expect(response.status).toBe(200);
        console.log(response.data);
    })

    test("Deleting a scooter", async() => {


        // Delete request
        const response = await fetch('http://localhost:1337/scooter/1', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
        });
        expect(response.status).toBe(200);


    });

    test("Deleting all scooters (after adding two scooters)", async() => {


        const jsonDataone = {
            lon: parseFloat('17.5537'),
            lat: parseFloat('59.26387'),
            battery: parseFloat('34.4'),
            status: 'free',
            city_cityid: parseInt('1')
        };

        // Post request
        const responseone = await fetch('http://localhost:1337/scooter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(jsonDataone)
        });

        const jsonDatatwo = {
            lon: parseFloat('17.5537'),
            lat: parseFloat('55.26387'),
            battery: parseFloat('54.4'),
            status: 'free',
            city_cityid: parseInt('1')
        };

        // Post request
        const responsetwo = await fetch('http://localhost:1337/scooter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(jsonDatatwo)
        });

        await Promise.all([responseone, responsetwo]);

        // Delete request
        const delresponse = await fetch('http://localhost:1337/scooter', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
        });
        expect(delresponse.status).toBe(200);


    });


})

describe('City tests', () => {
    test('Adding a city')
})