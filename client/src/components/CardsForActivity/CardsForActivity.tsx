import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import './CardsForActivity.css'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardSubTitle,
    MDBCardText,
    MDBCardLink,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { useParams } from "react-router-dom";
import { getActivityById } from "../../Services/serviceActivity";
import { updateUserActivity } from "../../Services/serviceParticipants";
export interface Coordinates {
    lat: number | null;
    lng: number | null;
    id?: string;
  }

interface CardsForActivityProps {
  marker: Coordinates;
  id?: string;
  onClose?: Dispatch<SetStateAction<Coordinates | null>>;

}

const CardsForActivity: React.FC<CardsForActivityProps> = ({ marker, onClose}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [activity, setActivity] = useState({ 
        title: '',
        date: '',
        meetingPoint:'',
        coordinates: {
            lat: null,
            lng: null,
          },
        typeOfActivity: '',
        aboutActivity: '',
        spots: '',
        telegramLink: ''
     });
        useEffect(() => {
            console.log(marker.id, 'I amhere')
        getActivityById(marker.id)
          .then((activity: any) => {
     
            if (activity) {
                setActivity(activity);
            }
          })
          .catch((error: any) => {
            console.error(error);
          });
      }, []);
    if (!marker || !isOpen) {
        return null;
      }
    
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose(null);
    }
  };
  const joinActivity = () => {
    const participantsData = {
      userId: 1, 
      activityId: parseInt(marker.id || "") 
    };
  
    updateUserActivity(participantsData)
      .then(response => {
        console.log('done')
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="card">
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>{activity.title}</MDBCardTitle>
        <MDBCardSubTitle>{activity.date}</MDBCardSubTitle>
        <MDBCardText>
        Info about activity: {activity.aboutActivity}
        </MDBCardText>
        <MDBCardText>
        Available spots: {activity.spots}/{activity.spots}
        </MDBCardText>
        <MDBCardTitle>Adress: {activity.meetingPoint}</MDBCardTitle>
        <MDBCardLink href='#'>Created by : {}</MDBCardLink>
        <MDBCardLink href='#' onClick={joinActivity}>Join</MDBCardLink>
        <MDBBtn onClick={handleClose}>Close</MDBBtn>
      </MDBCardBody>
    </MDBCard>
    </div>
  );
  }
  export default CardsForActivity;