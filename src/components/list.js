import { Component } from "react";
import React from 'react';

import TaskCell from './task-cell';

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ul>
              {this.props.todos.map(item => {
                return (
                    <TaskCell key={item.id} id={item.id} value={item.value} onDelete={this.props.onDelete}/>
                )
              })}
            </ul>
        )
    }
}

export default List;