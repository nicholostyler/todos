import  { Component } from "react";
import React from 'react';

class TaskCell extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <li className="list-item" key={this.props.id}>
                    {this.props.value}
                    <button className="delete is-pulled-right" onClick={() => this.props.onDelete(this.props.id)}>X</button>
                  </li>
        )
    }
}

export default TaskCell;