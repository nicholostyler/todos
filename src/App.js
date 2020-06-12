import React, { Component } from "react";
import './Appsass.scss';
import clsx from 'clsx';

import TodoList from './components/list';
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
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Brightness5 from '@material-ui/icons/Brightness5';
import HomeWork from '@material-ui/icons/HomeWork';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Hidden from '@material-ui/core/Hidden';

import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },


  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 240
    },
    flexGrow: 1,
  },

});



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTask: "",
      todos: [],
      open: false,
    };

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

  handleDrawerToggle = () => {
    this.setState(state => ({ open: !this.state.open }))
  }
  

  render() {
    const { classes } = this.props;
    return (
      <div className="App classes.root">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar >
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography varient="h6">Tasks</Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
        <Drawer
        anchor='left'
        container={classes.container}
        variant="temporary"
        onClose={this.handleDrawerToggle}
        open={this.state.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar className={classes.toolbar} />
        <div className={classes.drawerContainer}>
          <List>
            {['My Day', 'The Weekend', 'Next Month', 'This Year'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <Brightness5 /> : <Brightness5 />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['CompTIA exam', 'Programming', 'Schoolwork'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <HomeWork /> : <HomeWork />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
        <Drawer
        anchor='left'
        variant="persistent"
        open
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar className={classes.toolbar}/>
        <div className={classes.drawerContainer}>
          <List>
            {['My Day', 'The Weekend', 'Next Month', 'This Year'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <Brightness5 /> : <Brightness5 />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['CompTIA exam', 'Programming', 'Schoolwork'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <HomeWork /> : <HomeWork />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
        </Hidden>
        </nav>
        
        <main className={classes.content}>
          <Toolbar/>
          <Grid className="taskInput" container direction="row">
              <Grid item xs={8}>
                <TextField 
                id="outlined-basic" 
                fullWidth  
                label="Add item..."
                onChange={(e) => this.updateInput("newTask", e.target.value)} 
                variant="outlined" />
              </Grid>
              <Grid item xs>
              <Button variant="contained" color="primary" disableElevation id="btnAddTask" onClick={() => this.addTask()}>Add</Button>
              </Grid>
          </Grid>
          <div >
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
export default withStyles(styles)(App);
