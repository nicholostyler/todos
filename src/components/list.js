import { Component } from "react";
import React from 'react';
import List from '@material-ui/core/List';
import TaskCell from './task-cell';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem'

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
<List>
              {this.props.todos.map(item => {
                return (
                    <ListItem id="todoItem" key={item.id}>
                    {item.value}
                    <button className="delete is-pulled-right" onClick={() => this.props.onDelete(item.id)}></button>
                  </ListItem>
                )
              })}
            </List>
            
        )
    }
}

export default TodoList;