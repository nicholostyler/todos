import React, { Component } from "react";
import './Appsass.scss';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTask: "",
      categories: [],
      todos: [],
      open: false,
      snackbarMessage: ""
    };
  }

  componentDidMount() {
    // put in componentDidMount before application is rendered.
    this.populateFromLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      this.saveToLocalStorage();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

 

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.state.todos));
  }

  populateFromLocalStorage() {
    var storageTasks = JSON.parse(localStorage.getItem('tasks'));
    this.setState({
      todos: storageTasks
    });

  }

  updateInput(key, value) {
    // update react state
    this.setState({
      [key]: value
    });
  }

  addTask() {
    // check if task value is not empty.
    if (this.state.newTask == "") {
      this.setState({
        snackbarMessage: "Task description cannot be empty!",
        open: true,
      });  
    } else {
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

  }

  // clear textfield
}

  deleteTask(id) {
    // copy current list of items
    const list = [...this.state.todos];
    console.log(this.state.todos);

    // filter out item being deleted
    const updatedList = list.filter(item => item.id != id);
    
    this.setState({
      todos: updatedList,
    });

  }

  handleDrawerToggle = () => {
    this.setState(state => ({ open: !this.state.open }))
  }

  snackbarClose() {
    this.setState({
      open: false,
    });
  }
  
  render() {
    return (
      <div className="App">
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography varient="h6">Tasks</Typography>
          </Toolbar>
        </AppBar>
        
        <main>
          <Toolbar/>
          <Snackbar 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.open}  
          handleClose={this.snackbarClose}
          autoHideDuration={6000}
          >
            <Alert onClose={this.snackbarClose} severity="error">
              New task cannot be empty!  
            </Alert>
          </Snackbar>
          <Grid className="taskInput" container direction="row">
              <Grid item xs={10}>
                <TextField 
                id="outlined-basic" 
                fullWidth  
                label="Add item..."
                value={this.state.newTask}
                onChange={(e) => this.updateInput("newTask", e.target.value)} 
                variant="outlined" />
              </Grid>
              <Grid item xs>
              <Button variant="contained" color="primary" disableElevation id="btnAddTask" onClick={() => this.addTask()}>Add</Button>
              </Grid>
          </Grid>
          <div>
            <List component="nav">
              {
                this.state.todos.map((item) => {
                  return(
                  <ListItem key={item.id} button divider>
                    <Checkbox checked={false} tabIndex={-1} disableRipple/>

                    <ListItemText id={item.id} primary={item.value}/>
                    <ListItemSecondaryAction>
                      <IconButton aria-label="DeleteIcon" onClick={() => this.deleteTask(item.id)}>
                        <DeleteIcon/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
    )})
              }  
              
          
            
            </List>
          </div>
        </main>
      </div>
    );
  }
}
export default App;
