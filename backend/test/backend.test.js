const request = require("supertest");
const app = require("../app");

const headers = {
    "Content-type": "application/json",
    "API-KEY": "BOI-API-KEY",
};

describe("User tests", () => {
    test("Adding a user", async () => {
        var username = "username";
        var email = "email@example.com";
        var passwd = "passwd";

        const jsonData = {
            username: username,
            email: email,
            passwd: passwd,
        };

        const response = await request(app)
            .post("/v1/user")
            .set(headers)
            .send(JSON.stringify(jsonData));

        expect(response.statusCode).toBe(201);
    });

    test("Updating a user", async () => {
        var username = "newusername";
        var email = "newemail@example.com";

        const jsonData = {
            username: username,
            email: email,
        };

        const response = await request(app)
            .put("/v1/user/1")
            .set(headers)
            .send(JSON.stringify(jsonData));

        expect(response.statusCode).toBe(201);
    });

    test("Getting all users", async () => {
        const response = await request(app).get("/v1/user").set(headers);

        expect(response.statusCode).toBe(200);

        console.log(response.data);
    });

    test("Getting a user", async () => {
        const response = await request(app).get("/v1/user/1").set(headers);

        expect(response.statusCode).toBe(200);

        console.log(response.data);
    });

    test("Deleting a user", async () => {
        const response = await request(app).delete("/v1/user/1").set(headers);

        expect(response.statusCode).toBe(200);
    });
});

describe("City tests", () => {
    test("Adding a city", async () => {
        var cityName = "Sollentuna";
        var lat = "59.26387";
        var long = "17.5537";

        const jsonData = {
            id: cityName,
            lat: parseFloat(lat),
            lon: parseFloat(long),
        };

        const response = await request(app)
            .post("/v1/city")
            .set(headers)
            .send(JSON.stringify(jsonData));

        expect(response.statusCode).toBe(201);
    });

    test("Getting all cities", async () => {
        const response = await request(app).get("/v1/city").set(headers);

        expect(response.statusCode).toBe(200);

        console.log(response.data);
    });

    test("Getting a city", async () => {
        const response = await request(app)
            .get("/v1/city/Sollentuna")
            .set(headers);

        expect(response.statusCode).toBe(200);

        console.log(response.data);
    });

    test("Deleting a city", async () => {
        const response = await request(app)
            .delete("/v1/city/Sollentuna")
            .set(headers);

        expect(response.statusCode).toBe(200);
    });
});

describe("Scooter tests", () => {
    test("Adding a scooter", async () => {
        var lat = "59.26387";
        var long = "17.5537";
        var battery = "34.4";
        var status = "free";
        var city_cityid = "1";

        const jsonData = {
            lon: parseFloat(long),
            lat: parseFloat(lat),
            battery: parseFloat(battery),
            status: status,
            city_cityid: parseInt(city_cityid),
        };

        const response = await request(app)
            .post("/v1/scooter")
            .set(headers)
            .send(JSON.stringify(jsonData));

        expect(response.statusCode).toBe(201);
    });

    test("Updating a scooter", async () => {
        var lat = "59.26387";
        var long = "17.5548";
        var battery = "27.4";
        var status = "free";
        var city_cityid = "1";

        const jsonData = {
            lon: parseFloat(long),
            lat: parseFloat(lat),
            battery: parseFloat(battery),
            status: status,
            city_cityid: parseInt(city_cityid),
        };

        const response = await request(app)
            .put("/v1/scooter/1")
            .set(headers)
            .send(JSON.stringify(jsonData));

        expect(response.statusCode).toBe(201);
    });

    test("Getting all scooters", async () => {
        const response = await request(app).get("/v1/scooter").set(headers);

        expect(response.statusCode).toBe(200);

        console.log(response.data);
    });

    test("Getting a scooter", async () => {
        const response = await request(app).get("/v1/scooter/1").set(headers);

        expect(response.statusCode).toBe(200);

        console.log(response.data);
    });

    test("Deleting a scooter", async () => {
        const response = await request(app)
            .delete("/v1/scooter/1")
            .set(headers);

        expect(response.statusCode).toBe(200);
    });

    test("Deleting all scooters (after adding two scooters)", async () => {
        const jsonDataOne = {
            lon: parseFloat("17.5537"),
            lat: parseFloat("59.26387"),
            battery: parseFloat("34.4"),
            status: "free",
            city_cityid: parseInt("1"),
        };

        const jsonDataTwo = {
            lon: parseFloat("17.5537"),
            lat: parseFloat("55.26387"),
            battery: parseFloat("54.4"),
            status: "free",
            city_cityid: parseInt("1"),
        };

        const responseOne = await request(app)
            .post("/v1/scooter")
            .set(headers)
            .send(JSON.stringify(jsonDataOne));

        const responseTwo = await request(app)
            .post("/v1/scooter")
            .set(headers)
            .send(JSON.stringify(jsonDataTwo));

        await Promise.all([responseOne, responseTwo]);

        // Delete request
        const delResponse = await request(app)
            .delete("/v1/scooter")
            .set(headers);

        expect(delResponse.statusCode).toBe(200);
    });
});
