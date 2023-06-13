import { useEffect, useState } from "react";
import { getActivities } from "../../Services/serviceActivity";
import "./CreatedActivities.css";
import { ActivityInterface } from "../../pages/AddActivityPage/AddActivityPage";
import { useUID } from "../../customHooks";
import { useParams } from "react-router-dom";

const CreatedActivities = () => {
  const [createdActivities, setCreatedActivities] = useState<
    ActivityInterface[]
  >([]);
  const uid = useUID();
  const { id } = useParams();
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activities = await getActivities();
        console.log(activities);
        const filteredActivities = activities.data.filter(
          (activity: any) => activity.createdBy == id
        );
        console.log(filteredActivities);
        setCreatedActivities(filteredActivities);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivities();
  }, [uid]);

  return (
    <>
      {createdActivities.length > 0 && (
        <div className='createdActv'>
          <div>Created activities:</div>
          {createdActivities.map((activity: any, index: number) => (
            <div key={activity.id}>
              <span>
                {activity.title}
                {index !== createdActivities.length - 1 && ","}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default CreatedActivities;
