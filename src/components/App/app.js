import { useEffect, useState } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

let maxId = 100;

function App() {
  const [filter, setFilter] = useState('All');
  const [todoData, setTodoData] = useState([]);

  const onDelete = (id) => {
    localStorage.removeItem(`sec${id}`);
    localStorage.removeItem(`min${id}`);

    const idx = todoData.findIndex((el) => el.id === id);
    const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

    setTodoData(newArr);
  };

  const onAddItem = (desc) => {
    setTodoData((arr) => {
      maxId += 1;

      localStorage.setItem(`sec${maxId}`, 55);
      localStorage.setItem(`min${maxId}`, 0);
      return [
        {
          desc,
          completed: false,
          editing: false,
          id: maxId,
          time: new Date(Date.now()),
        },
        ...arr,
      ];
    });
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
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, completed: !oldItem.completed };

    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    setTodoData(newArr);
  };

  const todoCount = () => {
    const { length } = todoData.filter((el) => !el.completed);
    return length;
  };

  const todoClearCompleted = () => {
    if (todoData.length) {
      const newData = todoData.filter((elem) => {
        if (elem.completed) {
          localStorage.removeItem(`sec${elem.id}`);
          localStorage.removeItem(`min${elem.id}`);
        }
        return !elem.completed;
      });
      setTodoData(newData);
    }
  };

  useEffect(() => {
    onAddItem('Completed Task');
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
