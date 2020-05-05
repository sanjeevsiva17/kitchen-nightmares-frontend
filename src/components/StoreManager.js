import React, { Component} from 'react';
import TaskCreationForm from './TaskCreationForm';
import Tasks from './CreatedTasks';

class StoreManager extends Component{



    render() {
        return (
            <div className="task">
                <TaskCreationForm>
                </TaskCreationForm>
                
                <Tasks>
                </Tasks>
                
            </div>
          );
        }

}

export default StoreManager;
