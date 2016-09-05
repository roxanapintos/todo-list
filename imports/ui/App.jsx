import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/task.js';
 
import Task from './Task.jsx';
 
// app component - represents the whole app
class App extends Component {
  /**/
  handleSubmit (event) {
    event.preventDefault();

    // find the text field via the React ref
    const text = ReactDOM.findDOMNode (this.refs.textInput).value.trim();

    Tasks.insert ({
      text,
      createdAt: new Date(), //current time
    });

    // clear form
    ReactDOM.findDOMNode(this.refs.textInput).value ='';    
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            {/*handleSubmit in React listen to browser events*/}
            <input
              type="text"
              ref="textInput"
              placeholder="Add new tasks"
            />
          </form>
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    tasks: Tasks.find({}, {sort: {createdAt:-1}}).fetch(),
  };
}, App);