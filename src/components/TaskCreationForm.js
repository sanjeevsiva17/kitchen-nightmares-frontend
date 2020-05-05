import React, { Component} from 'react';

class TaskCreationForm extends Component{

    state = {
        task: {title: '', priority: ''}
    }

    createTask = event => {
        fetch('http://127.0.0.1:8000/tasks/task/', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json',
                        'Authorization': 'Token' + ' ' + localStorage.getItem('auth')},
            body : JSON.stringify(this.state.task)
        })
        // .then(data=>data.json())
        .then(data =>{
            console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    } 

    inputChanged = event =>{
        console.log(this.state)
        const task = this.state.task
        task[event.target.name] =  event.target.value
        this.setState({task})
    }

    render() {
        return (
            <div className="taskcreation">
              <h1>Create Task</h1>
              <label>
                  Title:
                  <input type="text" name="title" value={this.state.task.title} onChange={this.inputChanged}></input>
              </label>
              <br />
              <label>
                  Priority:
              <select name="priority" onChange={this.inputChanged} value={this.state.task.priority}>
                <option value="">Choose</option>
                <option value="H">High</option>
                <option value="M">Medium</option>
                <option value="L">Low</option>
              </select>
              </label>
              
              <button onClick={this.createTask}>createTask</button>
            </div>
          );
        }

}

export default TaskCreationForm;
