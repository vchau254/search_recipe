import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Notifications = ({error}) =>{
    NotificationManager.error('Error message', 'Click me!', 400000, () => {
        alert(error.message);
      });
    return(
        <div>
        <NotificationContainer/>
        </div>
    );
};
export default Notifications;