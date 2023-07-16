import { __prod__ } from "../constants";

let root = __prod__ ? "https://groupventure-server.fly.dev/" : "http://localhost:3333/";

export const updateUserActivity = async (participantsData: {
  userId: string;
  activityId: number;
}): Promise<any> => {
  try {
    const response = await fetch(root + "activities/join", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(participantsData),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (err: any) {
    console.error(err.message);
  }
};

export const updateUserActivityLeave = async (participantsData: {
  userId: string;
  activityId: number;
}): Promise<any> => {
  try {
    const response = await fetch(root + "activities/leave", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(participantsData),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (err: any) {
    console.error(err.message);
  }
};
