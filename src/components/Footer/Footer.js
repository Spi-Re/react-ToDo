import { Component } from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter';

export default class Footer extends Component {
  constructor() {
    super();
    this.state = {
      all: 'selected',
      active: '',
      completed: '',
    };

    this.onActive = (desc) => {
      if (desc === 'All') {
        this.setState({
          all: 'selected',
          active: '',
          completed: '',
        });
      }
      if (desc === 'Active') {
        this.setState({
          all: '',
          active: 'selected',
          completed: '',
        });
      }
      if (desc === 'Completed') {
        this.setState({
          all: '',
          active: '',
          completed: 'selected',
        });
      }
    };
  }

  render() {
    const { onFilter, todoCount, todoClear } = this.props;
    const { all, active, completed } = this.state;
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount()} items left</span>
        <ul className="filters">
          <TaskFilter status={all} desc="All" onFilter={onFilter} onActive={this.onActive} />
          <TaskFilter status={active} desc="Active" onFilter={onFilter} onActive={this.onActive} />
          <TaskFilter status={completed} desc="Completed" onFilter={onFilter} onActive={this.onActive} />
        </ul>
        <button type="button" className="clear-completed" onClick={todoClear}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  todoCount: () => {},
  todoClear: () => {},
};

Footer.propTypes = {
  todoCount: PropTypes.func,
  todoClear: PropTypes.func,
  onFilter: PropTypes.func.isRequired,
};
