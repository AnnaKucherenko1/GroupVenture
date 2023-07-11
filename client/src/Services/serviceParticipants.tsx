import { __prod__ } from "../constants";

let root = __prod__ ? "https://groupventure-server.fly.dev/" : "http://localhost:3333/";

export const updateUserActivity = function (participantsData: {
  userId: string;
  activityId: number;
}) {
  return fetch(root + "activities/join", {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(participantsData),
  });
};

export const updateUserActivityLeave = function (participantsData: {
  userId: string;
  activityId: number;
}) {
  return fetch(root + "activities/leave", {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(participantsData),
  });
};
