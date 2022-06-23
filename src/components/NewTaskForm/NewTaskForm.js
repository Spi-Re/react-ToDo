import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      holder: 'Task',
    };
  }

  render() {
    const { onAddItem } = this.props;
    const { holder } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder={holder}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                if (e.target.value !== '') {
                  this.setState({
                    holder: 'Task',
                  });
                  onAddItem(e.target.value);
                  e.target.value = '';
                } else {
                  this.setState({
                    holder: 'Write youre Task',
                  });
                }
              }
            }}
          />
          <input className="new-todo-form__timer" placeholder="Min" />
          <input className="new-todo-form__timer" placeholder="Sec" />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};
