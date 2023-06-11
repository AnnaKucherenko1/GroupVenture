
let root = "http://localhost:3333/";

export const updateUserActivity = function(participantsData : {userId: number, activityId: number}) {
    return fetch(root + "updateParticipants", {
      method: "PUT",
      credentials: 'include',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(participantsData),
    });
  }
  