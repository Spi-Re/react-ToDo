import { useState } from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter';

function Footer({ onFilter, todoCount, todoClearCompleted }) {
  const [chooseElement, setChooseElement] = useState({
    all: 'selected',
    active: '',
    completed: '',
  });

  const onActive = (desc) => {
    if (desc === 'All') {
      setChooseElement({
        all: 'selected',
        active: '',
        completed: '',
      });
    }
    if (desc === 'Active') {
      setChooseElement({
        all: '',
        active: 'selected',
        completed: '',
      });
    }
    if (desc === 'Completed') {
      setChooseElement({
        all: '',
        active: '',
        completed: 'selected',
      });
    }
  };

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount()} items left</span>
      <ul className="filters">
        <TaskFilter status={chooseElement.all} desc="All" onFilter={onFilter} onActive={onActive} />
        <TaskFilter status={chooseElement.active} desc="Active" onFilter={onFilter} onActive={onActive} />
        <TaskFilter status={chooseElement.completed} desc="Completed" onFilter={onFilter} onActive={onActive} />
      </ul>
      <button type="button" className="clear-completed" onClick={todoClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  todoCount: () => {},
  todoClearCompleted: () => {},
};

Footer.propTypes = {
  todoCount: PropTypes.func,
  todoClearCompleted: PropTypes.func,
  onFilter: PropTypes.func.isRequired,
};

export default Footer;
