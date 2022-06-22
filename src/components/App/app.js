import { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class App extends Component {
  constructor() {
    super();
    this.maxId = 100;
    this.state = {
      filter: 'All',
      todoData: [],
    };

    this.onDelete = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
        return {
          todoData: newArr,
        };
      });
    };

    this.onAddItem = (desc) => {
      this.setState(({ todoData }) => {
        this.maxId += 1;
        const newItem = {
          desc,
          completed: false,
          editing: false,
          id: this.maxId,
          time: new Date(Date.now()),
        };
        const newArr = [...todoData, newItem];
        return {
          todoData: newArr,
        };
      });
    };

    this.onFilter = (desc) => {
      if (desc === 'All') {
        this.setState(() => ({
          filter: 'All',
        }));
      }
      if (desc === 'Active') {
        this.setState(() => ({
          filter: 'Active',
        }));
      }
      if (desc === 'Completed') {
        this.setState({
          filter: 'Completed',
        });
      }
    };

    this.onToggleCompleted = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = { ...oldItem, completed: !oldItem.completed };

        const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
        return {
          todoData: newArr,
        };
      });
    };

    this.todoCount = () => {
      const { todoData } = this.state;
      const { length } = todoData.filter((el) => !el.completed);
      return length;
    };

    this.todoClear = () => {
      this.setState(({ todoData }) => {
        const newData = todoData.filter((elem) => !elem.completed);
        return {
          todoData: newData,
        };
      });
    };
  }

  componentDidMount() {
    this.onAddItem('Completed task');
    this.onAddItem('Editing Task');
    this.onAddItem('Active Task');
  }

  render() {
    const { todoData, filter } = this.state;

    return (
      <section className="todoapp">
        <NewTaskForm onAddItem={this.onAddItem} />
        <section className="main">
          <TaskList
            todoData={todoData}
            onDelete={this.onDelete}
            onToggleCompleted={this.onToggleCompleted}
            filter={filter}
          />
          <Footer todoClear={this.todoClear} todoCount={this.todoCount} onFilter={this.onFilter} />
        </section>
      </section>
    );
  }
}
