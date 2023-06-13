import { useEffect, useState } from "react";
import { getActivities } from "../../Services/serviceActivity";
import "./CreatedActivities.css";
import { ActivityInterface } from "../../pages/AddActivityPage/AddActivityPage";

const CreatedActivities = ({ uid }: { uid: number }) => {
  const [createdActivities, setCreatedActivities] = useState<
    ActivityInterface[]
  >([]);
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activities = await getActivities();
        const filteredActivities = activities.data.filter(
          (activity: any) => parseInt(activity.createdBy) === uid
        );
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
