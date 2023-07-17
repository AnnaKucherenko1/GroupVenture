import { __prod__ } from "../constants";
import { FormDataInterface, User } from "../interfaces";

let root = __prod__
  ? "https://groupventure-server.fly.dev/"
  : "http://localhost:3333/";

export const postUser = async (data: FormDataInterface): Promise<any> => {
  try {
    const response = await fetch(root + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    return await response.json();
  } catch (err: any) {
    console.error(err.message);
  }
};
export const getUserById = async (id: string): Promise<any> => {
  try {
    const response = await fetch(root + "profile/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("User not found");
    }

    return await response.json();
  } catch (err: any) {
    console.error(err.message);
  }
};
export const getUsersByIds = async (ids: string[]): Promise<any> => {
  // TODO: Create an endpoint that will accept multiple user ids and fetch in one call

  try {
    const promises = ids.map((id) => {
      return fetch(root + "profile/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`User with ID ${id} not found`);
        }
        return response.json();
      });
    });

    return Promise.all(promises);
  } catch (err: any) {
    console.error(err.message);
  }
};
export const login = async (user: User): Promise<any> => {
  try {
    const response = await fetch(root + `login`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (err: any) {
    console.error(err.message);
  }
};

export const logout = async (): Promise<any> => {
  try {
    const response = await fetch(root + `logout`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (err: any) {
    console.error(err.message);
  }
};

export const updateUser = async (id: string, info: any): Promise<any> => {
  try {
    const response = await fetch(root + "profile/edit", {
      method: "PATCH",
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
