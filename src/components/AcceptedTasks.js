import React, { Component } from 'react';
import Task from './TaskComponent';


class AcceptedTasks extends Component {

    state = {
        task: [],
        notifications: []
    }

    getTasks = event => {
        fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "taskdata", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token' + ' ' + localStorage.getItem('auth')
            }
        })
            .then(data => data.json())
            .then(data => {
                this.setState({
                    task: data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    Complete = (taskobj) => {
        let taskBody = {}
        taskBody["task"] = taskobj["task"]["id"]
        taskBody["accepted_by"] = taskobj["accepted_by"]["id"]
        taskBody["state"] = "COM"

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Token' + ' ' + localStorage.getItem('auth') },
            body: JSON.stringify(taskBody)
        }

        fetch('http://localhost:8000/tasks/taskstate/' + taskobj["task"]["id"] + '/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                //TODO : Hide decline Button
                //TODO : Show Completed
                //TODO : Task state id
            })
            .catch(error => {
                console.log(error)
            });
    }


    Decline = (taskobj) => {
        let taskBody = {}
        taskBody["task"] = taskobj["task"]["id"]
        taskBody["accepted_by"] = taskobj["accepted_by"]["id"]
        taskBody["state"] = "DEC"

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Token' + ' ' + localStorage.getItem('auth') },
            body: JSON.stringify(taskBody)
        }

        fetch('http://localhost:8000/tasks/taskstate/' + taskobj["task"]["id"] + '/', requestOptions)
            .then(response => response.json())
            .then(data => {
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

    componentDidMount() {
        this.getTasks();
    }





    render() {
        return (
            <div className="list-group">
                {this.state.task.map((taskobj, index) => {
                    return <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <Task 
                            title={taskobj["task"]["title"]}

                            created_by={<span>{taskobj["task"]["created_by"]}</span>}

                            state={taskobj.state}>
                        </Task>

                        <button  style={{float:"right"}} onClick={() => this.Complete(taskobj)}>Complete</button>
                        <button  onClick={() => this.Decline(taskobj)}>Decline</button>

                    </div>
                })}
            </div>
        );
    }

}

export default AcceptedTasks;
