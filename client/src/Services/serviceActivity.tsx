

import { __prod__ } from "../constants";
import { APIResponse, ActivityInterface } from "../interfaces";

let root = __prod__ ? "https://groupventure-server.fly.dev/" : "http://localhost:3333/";

export const postActivity = async (data: ActivityInterface, user: string): Promise<any> => {
  try {
    const withId = Object.assign({ createdBy: user }, data);
    const response = await fetch(root + "addactivity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify(withId),
    });
    return response.json();
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getActivities = async () => {
  try {
    const response = await fetch(root + "activities/");

    if (!response.ok) {
      throw new Error("Activity not found");
    }

    return response.json();
  } catch (err: any) {
    console.error(err.message);
  }
}

export const getActivityById = async (id: string): Promise<any> => {
  try {
    const response = await fetch(root + 'activity/' + id);

    if (!response.ok) {
      throw new Error("Activity not found");
    }

    return await response.json();
  } catch (err: any) {
    console.error(err.message);
  }
};

export const deleteActivityByID = async (id: string): Promise<void> => {
  try {
    const response = await fetch(root + "delete/" + id, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete activity");
    }
  } catch (err: any) {
    console.error(err.message);
  }
};
export const updateActivity = async (id: string, info: any): Promise<any> => {
  try {
    const response = await fetch(root + "editactivity", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, info }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (err: any) {
    console.error(err.message);
  }
};
