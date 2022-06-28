import PropTypes from 'prop-types';

function TaskFilter({ status, desc, onFilter, onActive }) {
  return (
    <li>
      <button
        type="button"
        className={status}
        onClick={() => {
          onActive(desc);
          onFilter(desc);
        }}
      >
        {desc}
      </button>
    </li>
  );
}

export default TaskFilter;

TaskFilter.defaultProps = {
  desc: 'button',
};

TaskFilter.propTypes = {
  desc: PropTypes.node,
  onFilter: PropTypes.func.isRequired,
};
