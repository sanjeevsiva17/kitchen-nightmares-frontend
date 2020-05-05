import React, { Component} from 'react';
import Task from './TaskComponent';
// const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_ENDPOINT + "declined/");

// socket.onopen = function (e) {
//     // socket.send("Hi")
// };


class Tasks extends Component{

    state = {
        task: []
    }

    getTasks = event => {

        fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "taskdata", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token' + ' ' + localStorage.getItem('auth')
            }
            })
        .then(data=>data.json())
        .then(data=>{
            this.setState({task :data})
        })
        .catch(error => {
            console.log(error)
        })
    } 

    cancel = (taskobj) =>{
        let taskBody={}
        taskBody["task"] = taskobj["task"]["id"]
        taskBody["accepted_by"] = taskobj["accepted_by"] ? taskobj["accepted_by"]["username"] : taskobj["accepted_by"]
        taskBody["state"] = "CAN"

       const requestOptions = {
           method: 'PUT',
           headers: { 'Content-Type': 'application/json', 
                        'Authorization': 'Token' + ' ' + localStorage.getItem('auth') },
           body: JSON.stringify(taskBody)
       }
   
       fetch('http://localhost:8000/tasks/taskstate/' + taskobj["task"]["id"] + '/', requestOptions)
       .then(response => response.json())
       .then(data=>{
           console.log(data)
           //TODO : Hide Accept Button, or whole div
           //TODO : Websocket/redis cache for notify
           //TODO : Task state id
           //TODO : infinite put request
       })
       .catch(error => {
        console.log(error)
    });
    }

    componentDidMount()
     {
        this.getTasks();           

        // socket.onmessage = (event) =>{
        //     console.log("Here ", event)
        //         // this.setState({

        //         // })
        // };

        // socket.onclose = function (event) {
        //     if (event.wasClean) {
        //         console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        //     } else {
        //         console.log('[close] Connection died');
        //     }
        // };

        // socket.onerror = function (error) {
        //     console.log(`[error] ${error.message}`);
        // };

     } 

    render() {
        return (
            <div className="list-group">
                    {this.state.task.map((taskobj, index) => {
                        return <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <Task 
                                    title = {taskobj["task"]["title"]} 
                                    
                                    accepted_by= {<span>{taskobj["accepted_by"] ? taskobj["accepted_by"]["username"] : taskobj["accepted_by"] }</span>}
                                    
                                    state = {taskobj.state}>

                                    </Task>
                                    <button onClick={() => this.cancel(taskobj)}>Cancel</button>
                                </div>
                    })}
            </div>
          );
        }

}

export default Tasks;
