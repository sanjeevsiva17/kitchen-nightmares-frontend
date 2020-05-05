import React, { Component} from 'react';

class Task extends Component{



    render() {
        return (
            <div className="task">
                <div className="row">
                    
                    <span style={{paddingRight:"10px"}}>{this.props.title}</span>

                    <span style={{paddingRight:"10px"}}>{this.props.accepted_by}</span>
                        
                    <span style={{paddingRight:"10px"}}>{this.props.created_by}</span>                            
                        
                    <span>{this.props.state}</span>
                </div>
            </div>
          );
        }

}

export default Task;
