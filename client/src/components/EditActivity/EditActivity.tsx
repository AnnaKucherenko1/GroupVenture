import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { ChangeEvent, FormEvent, useState } from "react";
import { ActivityInterface } from "../../pages/AddActivityPage/AddActivityPage";
import "./EditActivity.css";

export default function EditActivity({ handleClose }: any) {
  const [formData, setFormData] = useState<ActivityInterface>({
    title: "",
    date: "",
    meetingPoint: "",
    coordinates: {
      lat: null,
      lng: null,
    },
    typeOfActivity: "",
    aboutActivity: "",
    spots: "",
    telegramLink: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // postActivity(formData, uid);
    setFormData({
      title: "",
      date: "",
      meetingPoint: "",
      coordinates: {
        lat: null,
        lng: null,
      },
      typeOfActivity: "",
      aboutActivity: "",
      spots: "",
      telegramLink: "",
    });
  };

  const handleTypeOfActivityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      typeOfActivity: e.target.value,
    });
  };

  return (
    <div className='cardDiv'>
      <MDBContainer fluid>
        <MDBRow className='justify-content-center'>
          <MDBCol sm='9'>
            <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
              <div className='fw-normal mb-3' style={{ letterSpacing: "1px" }}>
                Change info about activity and submit
              </div>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <MDBInput
                  wrapperClass='mb-2 w-100'
                  label='Title'
                  id='title'
                  type='text'
                  size='lg'
                  value={formData.title}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass='mb-2 w-100'
                  id='date'
                  type='datetime-local'
                  size='lg'
                  value={formData.date}
                  onChange={handleChange}
                />
                <div className='mb-2'>
                  <label
                    htmlFor='typeOfActivity'
                    className='form-label'
                  ></label>
                  <select
                    id='typeOfActivity'
                    className='form-select'
                    value={formData.typeOfActivity}
                    onChange={handleTypeOfActivityChange}
                  >
                    <option value=''>Select an activity type</option>
                    <option value='hiking'>Hiking</option>
                    <option value='trip'>Trip</option>
                    <option value='city activities'>City activities</option>
                    <option value='camping'>Camping</option>
                    <option value='sport activities'>Sport activities</option>
                  </select>
                </div>
                <MDBInput
                  wrapperClass='mb-2 w-100'
                  label='How many people can join you?'
                  id='spots'
                  type='number'
                  size='lg'
                  value={formData.spots}
                  min='0'
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass='mb-2 w-100'
                  label='Please, provide an telegram link on chat for communication'
                  id='telegramLink'
                  type='text'
                  size='lg'
                  value={formData.telegramLink}
                  onChange={handleChange}
                />
                <MDBTextArea
                  wrapperClass='mb-2 w-100'
                  label='Tell us something about this activity'
                  id='aboutActivity'
                  rows={4}
                  value={formData.aboutActivity}
                  onChange={handleChange}
                />
                <MDBBtn
                  className='mb-2 w-100'
                  color='info'
                  size='lg'
                  type='submit'
                >
                  Submit
                </MDBBtn>
                <MDBBtn
                  className='mb-2 w-100'
                  color='danger'
                  size='lg'
                  type='reset'
                  onClick={handleClose}
                >
                  Close
                </MDBBtn>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
