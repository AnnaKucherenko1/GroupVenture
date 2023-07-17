import { Dispatch, SetStateAction } from "react";

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
    avatar?: string;
    firstName?: string;
    lastName?: string;
    age?: string;
    infoAboutUser?: string;
    id?: string;
    email?: string;
    password?: string
  }
  export interface APIResponse<T> {
    success: boolean, 
    data: T, 
    message: string
  }
  export interface FormDataInterface {
    avatar: string | File | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: string;
    infoAboutUser: string;
  }
  export interface Coordinates {
    lat: number | null;
    lng: number | null;
  }
  //props
  export interface CardsForActivityProps {
    marker: Coordinates;
    id?: string;
    onClose?: Dispatch<SetStateAction<Coordinates | null>>;
  }
  export interface EditProfileProps {
    handleClose: () => void;
    profileUser: User | null;
    handleProfileEdit: () => void;
  }
  export interface MapProps {
    markers: Coordinates[];
    selectedMarker?: Coordinates | null;
    onMapClick?: (event: google.maps.MouseEvent) => void;
    onMarkerClick?: (marker: Coordinates, id?: number) => void;
    center?: google.maps.LatLngLiteral | undefined;
  }
  export interface EditActivityProps {
    handleClose: () => void, 
    activity: ActivityInterface
  }
  export interface LoggedInProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
  }