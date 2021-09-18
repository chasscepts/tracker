import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/css/TaskPanel.module.css';
import Task from './Task';
import LoadingPanel from './LoadingPanel';
import { loadTasks, selectDate, selectTasks } from '../reducers/tasksSlice';

export default function TaskPanel() {
  const date = useSelector(selectDate);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  dispatch(loadTasks(date));

  if (!tasks) {
    return <LoadingPanel text="Loading tasks ..." />;
  }

  return (
    <div className={styles.container}>
      {tasks.map((t) => <Task task={t} date={date} key={t.title} />)}
    </div>
  );
}
