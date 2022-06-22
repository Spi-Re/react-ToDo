import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      holder: 'What needs to be done?',
    };
  }

  render() {
    const { onAddItem } = this.props;
    const { holder } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder={holder}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              if (e.target.value !== '') {
                this.setState({
                  holder: 'What needs to be done?',
                });
                onAddItem(e.target.value);
                e.target.value = '';
              } else {
                this.setState({
                  holder: 'Please, write here youre Task',
                });
              }
            }
          }}
        />
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};
