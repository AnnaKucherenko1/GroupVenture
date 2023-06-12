import { useEffect, useRef } from "react";

export const useCookies = (cookieName: string): string => {   
  const cookies = document.cookie.split(';')
  let formCookie: string = "";
  cookies.forEach((cookie) => {
    if(cookie.startsWith(`${cookieName}=`)){
        formCookie = cookie.replace(`${cookieName}=`,"");
    }
  });

  return formCookie;
}

export const useUID = () => {
  return parseInt(localStorage.getItem("uid") || "0");
}

// export const useLogout = () => {
//   document.cookie = `sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//   localStorage.removeItem("uid");
// }