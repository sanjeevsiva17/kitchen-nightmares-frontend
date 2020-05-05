import React, { Component} from 'react';
import AcceptedTasks from './AcceptedTasks';
import AcceptTasks from './AcceptTask';


class DeliveryExecutive extends Component{

    render() {
        return (
            <div className="task">
                <AcceptTasks></AcceptTasks>
                <AcceptedTasks></AcceptedTasks>                
            </div>
          );
        }

}

export default DeliveryExecutive;
