const request = require("supertest");
const app = require("./app");
const { Activity, UserActivityParticipation } = require("./models/associations");
import mongoose from "mongoose";
const databaseTest = "Newtest";
const mongoURI = `mongodb://localhost:27017/${databaseTest}`;
const testServerPort = 4444;


beforeAll(async () => {
    await Activity.destroy({ where: {} });
    // await User.destroy({ where: {} });
  });
  
  afterAll(async () => {
    await Activity.destroy({ where: {} });
    await User.destroy({ where: {} });
    // sequelize.close();
  });
  
// Test POST /activity
describe("POST /activity", () => {
  it("should create a new activity", async () => {
    const response = await request(app)
      .post("/activity")
      .send({
        title: "Test Activity",
        date: "2022-01-01",
        meetingPoint: "Test Meeting Point",
        coordinates: "Test Coordinates",
        typeOfActivity: "Test Type",
        aboutActivity: "Test Activity Description",
        spots: 10,
        telegramLink: "https://t.me/test",
        createdBy: "Test User",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Test Activity");

  });
});

// Test GET /activities
describe("GET /activities", () => {
  it("should retrieve a list of activities", async () => {
    const response = await request(app).get("/activities");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

// Test GET /activity/:id
describe("GET /activity/:id", () => {
  it("should retrieve an activity by ID", async () => {
    const activity = await Activity.create({
      title: "Test Activity",
      date: "2022-01-01",
      meetingPoint: "Test Meeting Point",
      coordinates: "Test Coordinates",
      typeOfActivity: "Test Type",
      aboutActivity: "Test Activity Description",
      spots: 10,
      telegramLink: "https://t.me/test",
      createdBy: "Test User",
    });

    const response = await request(app).get(`/activity/${activity.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Test Activity");

  });
});

// Test DELETE /activity/:id
describe("DELETE /activity/:id", () => {
  it("should delete an activity by ID", async () => {
    const activity = await Activity.create({
      title: "Test Activity",
      date: "2022-01-01",
      meetingPoint: "Test Meeting Point",
      coordinates: "Test Coordinates",
      typeOfActivity: "Test Type",
      aboutActivity: "Test Activity Description",
      spots: 10,
      telegramLink: "https://t.me/test",
      createdBy: "Test User",
    });

    const response = await request(app).delete(`/activity/${activity.id}`);

    expect(response.statusCode).toBe(200);
  });
});

describe("PUT /activity", () => {
  it("should update an activity", async () => {
    const activity = await Activity.create({
      title: "Test Activity",
      date: "2022-01-01",
      meetingPoint: "Test Meeting Point",
      coordinates: "Test Coordinates",
      typeOfActivity: "Test Type",
      aboutActivity: "Test Activity Description",
      spots: 10,
      telegramLink: "https://t.me/test",
      createdBy: "Test User",
    });

    const response = await request(app)
      .patch("/activity")
      .send({
        id: activity.id,
        info: { title: "Updated Activity" },
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Updated Activity");
  });
});
