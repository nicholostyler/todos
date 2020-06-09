import React, { Component } from "react";
import './Appsass.scss';
import List from './components/list';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTask: "",
      todos: [],
    };

  }

  componentDidMount() {
    console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  updateInput(key, value) {
    // update react state
    this.setState({
      [key]: value
    });
  }

  addTask() {
    // create task with unique ID
    const newTask = {
      id: 1 + Math.random(),
      value: this.state.newTask.slice()
    };

    // copy of current list of items
    const list = [...this.state.todos];

    // add new item to list
    list.push(newTask);

    // update state with new list and reset
    this.setState({
      todos: list,
      newTask: "",
    });

    console.log(this.state);
  }

  deleteTask(id) {
    console.log(id);
    // copy current list of items
    const list = [...this.state.todos];

    // filter out item being deleted
    const updatedList = list.filter(item => item.id != id);
    
    this.setState({
      todos: updatedList,
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <div className="add-div">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Type item here..."
                value={this.state.newTask}
                className="input"
                onChange={(e) => this.updateInput("newTask", e.target.value)}
              />
              <button className="button" onClick={() => this.addTask()}>Add</button>
            </form>
            
          </div>
          <div className="todolist">
            <List todos={this.state.todos} onDelete={this.deleteTask.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
