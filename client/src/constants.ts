export const __prod__ = process.env.NODE_ENV === "production";

export const ACTIVITY_INIT_VALUE = {
  title: "",
  date: "",
  meetingPoint: "",
  createdBy: "",
  coordinates: {
    lat: 0,
    lng: 0,
  },
  typeOfActivity: "",
  aboutActivity: "",
  spots: "",
  telegramLink: "",
  UserActivityParticipations: [],
};

export const CREATOR_INIT_VALUE = {
  avatar: "",
  firstName: "",
  lastName: "",
  age: "",
  infoAboutUser: "",
  id: "",
};

export const FORM_DATA_INIT_VALUE = {
    title: "",
    date: "",
    meetingPoint: "",
    coordinates: {
      lat: 0,
      lng: 0,
    },
    typeOfActivity: "",
    aboutActivity: "",
    spots: "",
    telegramLink: "",
};
export const HOME_DATA_INIT_VALUE = {
  date: "",
  coordinates: {
    lat: 0,
    lng: 0,
  },
  meetingPoint: "",
  typeOfActivity: "",
}

export const FORM_LOGIN_INIT_VALUE = {
  email: "",
  password: "",
}
export const FORM_USER_INIT_VALUE = {
  avatar: null,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  age: "",
  infoAboutUser: "",
}
export const DEFAULT_CENTER = {
  lat: 51.541837,
  lng: -0.139199,
};
