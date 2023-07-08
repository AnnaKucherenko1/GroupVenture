export interface Coordinates {
    lat: number | null;
    lng: number | null;
    id?: string;
  }
  export interface ActivityInterface {
    id?: string;
    title: string;
    date: string;
    meetingPoint: string;
    coordinates: Coordinates;
    createdBy?: string | undefined;
    typeOfActivity: string;
    aboutActivity: string;
    spots: string;
    telegramLink: string;
    UserActivityParticipations?: any
  }
  export interface User {
    avatar: string;
    firstName: string;
    lastName: string;
    age: string;
    infoAboutUser: string;
    id: string;
  }