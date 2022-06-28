/* eslint-disable jsx-a11y/control-has-associated-label */
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStopwatch } from 'react-timer-hook';

function Task({ id, desc, completed, editing, onDelete, onToggleCompleted, time }) {
  const { seconds, minutes, start, pause } = useStopwatch({ autoStart: false });

  const createTime = time;
  const [convertCreateTime, setConvertCreateTime] = useState(
    formatDistanceToNow(createTime, {
      includeSeconds: true,
    })
  );

  const tick = () => {
    setConvertCreateTime(
      formatDistanceToNow(createTime, {
        includeSeconds: true,
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('secundomer2', seconds);
    const timer = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timer);
    };
  });

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
            <button type="button" className="icon icon-play" onClick={() => start} />
            <button type="button" className="icon icon-pause" onClick={pause} />
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
          <span className="description">created {convertCreateTime} ago</span>
        </label>
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" onClick={onDelete} />
      </div>

      {editing ? <input type="text" className="edit" placeHolder={desc} /> : null}
    </li>
  );
}

export default Task;

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
