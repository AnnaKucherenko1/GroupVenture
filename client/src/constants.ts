export const __prod__ = process.env.NODE_ENV === "production";

export const ACTIVITY_INIT_VALUE = {
  title: "",
  date: "",
  meetingPoint: "",
  createdBy: "",
  coordinates: {
    lat: null,
    lng: null,
  },
  typeOfActivity: "",
  aboutActivity: "",
  spots: "",
  telegramLink: "",
  UserActivityParticipations: [],
  id: "",
};

export const CREATOR_INIT_VALUE = {
  avatar: "",
  firstName: "",
  lastName: "",
  age: "",
  infoAboutUser: "",
  id: "",
};
