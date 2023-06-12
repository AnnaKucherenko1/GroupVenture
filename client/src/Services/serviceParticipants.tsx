
let root = "http://localhost:3333/";

export const updateUserActivity = function(participantsData : {userId: string, activityId: number}) {
    return fetch(root + "activities/join", {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(participantsData),
    });
  }
  