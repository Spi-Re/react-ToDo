/* eslint-disable jsx-a11y/control-has-associated-label */
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Task({ id, desc, completed, editing, onDelete, onToggleCompleted, time }) {
  const createTime = time;
  const [convertCreateTime, setConvertCreateTime] = useState(
    formatDistanceToNow(createTime, {
      includeSeconds: true,
    })
  );

  const [go, setGo] = useState(false);

  const [localSeconds, setLocalSeconds] = useState(JSON.parse(localStorage.getItem(`sec${id}`)));

  const updateTimer = () => {
    let minutes = JSON.parse(localStorage.getItem(`min${id}`));
    if (go) {
      JSON.stringify(localStorage.setItem(`sec${id}`, localSeconds));
      setLocalSeconds((sec) => sec + 1);

      if (localSeconds === 59) {
        setLocalSeconds((seconds) => seconds - 60);
        minutes += 1;
        JSON.stringify(localStorage.setItem(`min${id}`, minutes));
        JSON.stringify(localStorage.setItem(`sec${id}`, localSeconds - 59));
      }
    }
  };

  const startTimer = () => {
    setGo(true);
  };

  const stopTimer = () => {
    setGo(false);
  };

  const tick = () => {
    updateTimer();
    setConvertCreateTime(
      formatDistanceToNow(createTime, {
        includeSeconds: true,
      })
    );
  };

  useEffect(() => {
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
            <button type="button" className="icon icon-play" onClick={startTimer} />
            <button type="button" className="icon icon-pause" onClick={stopTimer} />
            {JSON.parse(localStorage.getItem(`min${id}`)) < 10
              ? `0${JSON.parse(localStorage.getItem(`min${id}`))}`
              : JSON.parse(localStorage.getItem(`min${id}`))}
            :
            {JSON.parse(localStorage.getItem(`sec${id}`)) < 10
              ? `0${JSON.parse(localStorage.getItem(`sec${id}`))}`
              : JSON.parse(localStorage.getItem(`sec${id}`))}
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
