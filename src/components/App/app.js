/* eslint-disable no-plusplus */
import { useState, useEffect } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

function App() {
  let maxId = 100;
  const [filter, setFilter] = useState('All');
  const [todoData, setTodoData] = useState([]);

  // почему-то не доавляется нормальный key для таски, он же не удаляется при удалении последней

  const onDelete = (id) => {
    setTodoData((arr) => {
      const idx = arr.findIndex((el) => el.id === id);
      const newArr = [...arr.slice(0, idx), ...arr.slice(idx + 1)];

      return newArr;
    });
  };

  const onAddItem = (desc) => {
    maxId += 1;
    const newItem = {
      desc,
      completed: false,
      editing: false,
      id: maxId,
      time: new Date(Date.now()),
    };
    // const newArr = [...todoData, newItem];
    setTodoData([...todoData, newItem]);
  };

  const onFilter = (desc) => {
    if (desc === 'All') {
      setFilter('All');
    }
    if (desc === 'Active') {
      setFilter('Active');
    }
    if (desc === 'Completed') {
      setFilter('Completed');
    }
  };

  const onToggleCompleted = (id) => {
    setTodoData((arr) => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      const newArr = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
      return newArr;
    });
  };

  const todoCount = () => {
    const { length } = todoData.filter((el) => !el.completed);
    return length;
  };

  const todoClearCompleted = () => {
    setTodoData(({ arr }) => {
      const newData = arr.filter((elem) => !elem.completed);

      return newData;
    });
  };

  useEffect(() => {
    console.log('mount');
    onAddItem('Completed task');
    onAddItem('Editing Task');
    onAddItem('Active Task');
  }, []);

  return (
    <section className="todoapp">
      <NewTaskForm onAddItem={onAddItem} />
      <section className="main">
        <TaskList todoData={todoData} onDelete={onDelete} onToggleCompleted={onToggleCompleted} filter={filter} />
        <Footer todoClearCompleted={todoClearCompleted} todoCount={todoCount} onFilter={onFilter} />
      </section>
    </section>
  );
}

export default App;
