/* eslint-disable jsx-a11y/control-has-associated-label */
import { formatDistanceToNow } from 'date-fns';
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor(props) {
    super();
    this.createTime = props.time;
    this.state = {
      time: formatDistanceToNow(this.createTime, {
        includeSeconds: true,
      }),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      time: formatDistanceToNow(this.createTime, {
        includeSeconds: true,
      }),
    });
  }

  render() {
    const { editing, desc, id, onDelete, onToggleCompleted, completed } = this.props;
    const { time } = this.state;

    let classNames = '';
    if (completed) classNames += 'completed';
    if (editing) classNames += 'editing';

    return (
      <li className={classNames}>
        <div className="view">
          <input
            id={`check${id}`}
            className="toggle"
            type="checkbox"
            defaultChecked={completed}
            onClick={onToggleCompleted}
          />
          <label htmlFor={`check${id}`}>
            <span className="description">{desc}</span>
            <span className="created">created {time} ago</span>
          </label>
          <button type="button" className="icon icon-edit" />
          <button type="button" className="icon icon-destroy" onClick={onDelete} />
        </div>

        {editing ? <input type="text" className="edit" placeHolder={desc} /> : null}
      </li>
    );
  }
}

Task.defaultProps = {
  time: new Date(),
  desc: 'Пусто',
  editing: false,
  completed: false,
};

Task.propTypes = {
  time: PropTypes.instanceOf(Date),
  desc: PropTypes.node,
  editing: PropTypes.bool,
  completed: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
};
