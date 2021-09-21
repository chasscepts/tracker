import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/css/TaskPanel.module.css';
import Task from './Task';
import LoadingPanel from './LoadingPanel';
import { loadTasks, selectDate, selectTasks } from '../reducers/tasksSlice';
import { setNextEntry } from '../reducers/timerSlice';

export default function TaskPanel() {
  const [redirect, setRedirect] = useState(false);
  const date = useSelector(selectDate);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  useEffect(() => dispatch(loadTasks(date)), []);

  if (!tasks) {
    return <LoadingPanel text="Loading tasks ..." />;
  }

  const handleClick = (idx) => {
    const task = tasks[idx];
    if (!task) return;
    dispatch(setNextEntry({ entry: task.entries[0], title: task.title }));
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/timer" />;
  }

  return (
    <div className={styles.container}>
      {tasks.map(
        (t, idx) => <Task index={idx} task={t} key={t.title} onClick={handleClick} />,
      )}
    </div>
  );
}
