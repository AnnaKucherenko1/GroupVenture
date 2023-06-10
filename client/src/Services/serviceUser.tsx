import { profile } from "console";
import { FormDataInterface } from "../pages/Authentication/SignupPage";


let root = "http://localhost:3333/";
export const postUser = async (data: FormDataInterface) => {
  const response = await fetch(root + 'signup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  return response.json();
};
export function getUserById(id: any) {
    return fetch(root + 'profile/' + id).then((response) => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    });
   
  }


  export function login(user: any) {
    return fetch(root + `login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then((res) => {
      console.log(res)
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    });
  }
  
