import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

export default class TaskList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { onToggleCompleted, onDelete, todoData, filter } = this.props;
    return (
      <ul className="todo-list">
        {todoData
          .filter((elem) => {
            if (filter === 'All') {
              return elem;
            }
            if (filter === 'Active') {
              return !elem.completed;
            }
            if (filter === 'Completed') {
              return elem.completed;
            }
            return elem;
          })
          .map((item) => (
            <Task
              key={item.id}
              id={item.id}
              desc={item.desc}
              completed={item.completed}
              editing={item.editing}
              time={item.time}
              onDelete={() => onDelete(item.id)}
              onToggleCompleted={() => onToggleCompleted(item.id)}
            />
          ))}
      </ul>
    );
  }
}

TaskList.propTypes = {
  onToggleCompleted: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  todoData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
