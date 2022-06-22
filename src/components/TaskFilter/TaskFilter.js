import { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskFilter extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { status, desc, onFilter, onActive } = this.props;

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
}

TaskFilter.defaultProps = {
  desc: 'button',
};

TaskFilter.propTypes = {
  desc: PropTypes.node,
  onFilter: PropTypes.func.isRequired,
};
