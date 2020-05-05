import React, { Component } from 'react';
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_ENDPOINT + "dashboard/");

socket.onopen = function (e) {
    socket.send("Hi")
};


class AcceptTasks extends Component {

    state = {
        newtask: 'No New Tasks',
        task: null
    }

    componentDidMount() {        
        socket.onmessage = (event) =>{
            console.log("Here ", event)
                this.setState({
                    newtask: JSON.parse(JSON.parse(event.data))["title"],
                    task : JSON.parse(JSON.parse(event.data))
                })
        };

        socket.onclose = function (event) {
            if (event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.log('[close] Connection died');
            }
        };

        socket.onerror = function (error) {
            console.log(`[error] ${error.message}`);
        };


    }

    accept = (taskobj) =>{
            console.log(this.state.task)
            let taskBody = {}
            taskBody["task"] = this.state.task["id"]
            taskBody["accepted_by"] = parseInt(localStorage.getItem('deid'))
            taskBody["state"] = "ACC"
            console.log(taskBody)
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': 'Token' + ' ' + localStorage.getItem('auth') },
                body: JSON.stringify(taskBody)
            }
    
            fetch('http://localhost:8000/tasks/taskstate/' + this.state.task.id + '/', requestOptions)
                // .then(response => response.json())
                .then(data => {
                    console.log(data)
                    //TODO : Hide decline Button
                    //TODO : Show Completed
                    //TODO : Task state id
                })
                .catch(error => {
                    console.log(error)
                });

        socket.send("Hi")
        
    }

    render() {
        return (
            <div className="Accept Task">
                <label>
                    {this.state.newtask}
                </label>
                <button onClick={this.accept}>Accept</button>
            </div>
        );
    }

}

export default AcceptTasks;
