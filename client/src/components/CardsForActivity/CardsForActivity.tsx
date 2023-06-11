import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import './CardsForActivity.css'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardSubTitle,
    MDBCardText,
    MDBCardLink,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { Link, useParams } from "react-router-dom";
import { getActivityById } from "../../Services/serviceActivity";
import { updateUserActivity } from "../../Services/serviceParticipants";
import { UserContext } from "../../UserContext";
import { getUserById } from "../../Services/serviceUser";
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
        createdBy: '',
        coordinates: {
            lat: null,
            lng: null,
          },
        typeOfActivity: '',
        aboutActivity: '',
        spots: '',
        telegramLink: '',
        
     });
     const [user, setUser] = useState({
      avatar: '',
        firstName: '',
        lastName: '',
        age: '', 
        infoAboutUser: '',
        id: ''
     })
        useEffect(() => {
            console.log(marker.id, 'I amhere')
        getActivityById(marker.id)
        .then((activity: any) => {
          
          if (activity) {
            setActivity(activity);
          }
          getUserById(activity.createdBy).then((user: any) => {
          
            if (user) {
              setUser(user);
            }
            })
            .catch((error: any) => {
              console.error(error);
            });
          console.log(activity)
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
      userId: 0, 
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
    // <div className="card">
    <MDBCard>
      <MDBCardBody>
        <MDBBtn onClick={handleClose}>Close</MDBBtn>
        <div className="activity-details">
          <MDBCardTitle>{activity.title}</MDBCardTitle>
          <MDBCardSubTitle>{activity.date}</MDBCardSubTitle>
          <MDBCardText>Info about activity: {activity.aboutActivity}</MDBCardText>
          <MDBCardText>
            Free spots: {activity.spots}/{activity.spots}
          </MDBCardText>
          <MDBCardTitle>Address: {activity.meetingPoint}</MDBCardTitle>
        </div>
        <div className="created-by">
          <Link to={`/profile/${user.id}`}>Created by: <span>{user.firstName}</span></Link>
        </div>
        <div className="button-section">
          <MDBBtn onClick={joinActivity}>Join</MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  // </div>
  );
  }
  export default CardsForActivity;