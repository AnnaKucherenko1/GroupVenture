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
import { getActivities, getActivityById } from "../../Services/serviceActivity";
import { updateUserActivity } from "../../Services/serviceParticipants";
import { getUserById, getUsersByIds } from "../../Services/serviceUser";
import { useUID } from "../../customHooks";
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
  const uid = useUID();
  const [isOpen, setIsOpen] = useState(true);
  const [occupiedSpots, setOccupiedSpots] = useState(0);
  const [participants, setParticipants] = useState([])
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

  const [creator, setCreator] = useState({
  avatar: '',
    firstName: '',
    lastName: '',
    age: '', 
    infoAboutUser: '',
    id: ''
  });

  // useEffect(() => {
  //   getActivityById(marker.id).then((activity: any) => {

  //     if (activity) {
  //       setActivity(activity);
  //     }
  //     console.log(activity)
  //     getUserById(activity.createdBy).then((user: any) => {
  //       if (user) {
  //         setCreator(user);
  //       }
  //       setOccupiedSpots(activity.UserActivityParticipations.length);
  //     }).catch((error: any) => {
  //       console.error(error);
  //     });

  //   }).catch((error: any) => {
  //     console.error(error);
  //   });
  // }, []);
  useEffect(() => {
    getActivityById(marker.id)
      .then((activity: any) => {
        if (activity) {
          console.log(activity)
          setActivity(activity);
          console.log(activity)
          const userIds = [activity.createdBy];
         if(activity.UserActivityParticipations.length > 0) {
           
           const userParticipationIds = activity.UserActivityParticipations.map((participation: any) => participation);
           console.log(userParticipationIds)
           userIds.push(...userParticipationIds);
           getUsersByIds(userIds)
             .then((users: any) => {
               console.log(users, 'users')
               const creator = users.find((user: any) => user.id === activity.createdBy);
               setCreator(creator);
               console.log(creator.firstName)
               const participants = users.filter((user: any) => userParticipationIds.includes(user.id));
               setParticipants(participants);
               console.log(participants)
               setOccupiedSpots(activity.UserActivityParticipations.length);
             })
             .catch((error: any) => {
               console.error(error);
             });
         } else {
          getUserById(activity.createdBy).then((user: any) => {
                    if (user) {
                      setCreator(user) ;
                    }
                    
                  }).catch((error: any) => {
                    console.error(error);
                  });
         }
  
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
      userId: String(uid || ""), 
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
      <div className="button-section">
        <MDBBtn className="delete-button" onClick={handleClose}>✕</MDBBtn>
        </div>
        <div className="activity-details">
          <MDBCardTitle>{activity.title}</MDBCardTitle>
          <MDBCardSubTitle>{activity.date}</MDBCardSubTitle>
          <MDBCardText>Info about activity: {activity.aboutActivity}</MDBCardText>
          <MDBCardText>
            Occupied spots: {occupiedSpots}/{activity.spots}
          </MDBCardText>
          <MDBCardTitle>Address: {activity.meetingPoint}</MDBCardTitle>
        </div>
        <div className="created-by">
          <Link to={`/profile/${creator.id}`}>Created by: <span>{creator.firstName}</span></Link>
        </div>
        <div className="button-section">
          { uid !== parseInt(creator.id) && <MDBBtn onClick={joinActivity}>Join</MDBBtn> }
        </div>
      </MDBCardBody>
    </MDBCard>
  // </div>
  );
  }

  
  export default CardsForActivity;