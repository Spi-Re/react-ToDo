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
      minutes: JSON.parse(localStorage.getItem(`${props.id}min`)),
      seconds: JSON.parse(localStorage.getItem(`${props.id}sec`)),
      go: false,
    };

    setInterval(() => {
      const { go } = this.state;
      if (go) {
        this.updateTimer();
      }
    }, 1000);

    this.updateTimer = () => {
      this.setState(({ seconds, minutes }) => {
        const newSeconds = seconds + 1;
        localStorage.setItem(`${props.id}sec`, JSON.stringify(newSeconds));
        if (newSeconds % 60 === 0) {
          const newMinutes = minutes + 1;
          localStorage.setItem(`${props.id}min`, JSON.stringify(newMinutes));
          return {
            seconds: newSeconds,
            minutes: newMinutes,
          };
        }
        return {
          seconds: newSeconds,
        };
      });
    };

    this.startTimer = () => {
      this.setState({
        go: true,
      });
    };

    this.stopTimer = () => {
      this.setState({
        go: false,
      });
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
    const { time, minutes, seconds } = this.state;
    const timer = new Date();
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
            <span className="title">{desc}</span>
            <span className="description">
              <button type="button" className="icon icon-play" onClick={this.startTimer} />
              <button type="button" className="icon icon-pause" onClick={this.stopTimer} />
              {timer.getMinutes(timer.setMinutes(minutes)) < 10
                ? `0${timer.getMinutes(timer.setMinutes(minutes))}`
                : timer.getMinutes(timer.setMinutes(minutes))}
              :
              {timer.getSeconds(timer.setSeconds(seconds)) < 10
                ? `0${timer.getSeconds(timer.setSeconds(seconds))}`
                : timer.getSeconds(timer.setSeconds(seconds))}
            </span>
            <span className="description">created {time} ago</span>
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
