import React, { Component} from 'react';
import DeliveryExecutive from './DeliveryExecutive';
import StorageManager from './StoreManager'

class Dashboard extends Component{

state = {
    user: null
}

  getUserType= () =>{
    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "auth/profile/", {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token' + ' ' + localStorage.getItem('auth')
      }
      })
      .then(data => data.json())
      .then(data => {
          if (data["role"] === "DE"){
          localStorage.setItem('deid', data["id"]);
          this.setState({user :<DeliveryExecutive></DeliveryExecutive> })
          }
          else{
            this.setState({user : <StorageManager></StorageManager>})
          }
          
      })
      .catch(error => {
          console.log(error)
      })
  }

  componentDidMount()
  {
     this.getUserType();           
  } 

    render() {
        return (
            <div className="dashboard">
                {this.state.user}
            </div>
          );
        }

}

export default Dashboard;
