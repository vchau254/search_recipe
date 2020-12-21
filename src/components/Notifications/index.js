import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Notifications = (props) =>{
    if(props.error){
        NotificationManager.error('Error message', 'Click me!', 50000, () => {
            alert(props.error.message);
          });
    }else if(props.message){
        NotificationManager.warning('Error message', 'Click me!', 50000, () => {
            alert(props.message);
          });
    }
    return(
        <div>
        <NotificationContainer/>
        </div>
    );
};
export default Notifications;