import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../assets/css/TaskPanel.module.css';
import LoadingPanel from './LoadingPanel';
import { loadTasks, selectDate, selectTasks } from '../reducers/tasksSlice';
import { timeString } from '../utilities/dates';
import icons from '../utilities/icons';

function Task({ task }) {
  return (
    <div className={styles.taskContainer}>
      <Link className={styles.btn} to={`/tasks/${task.id}/entries/${task.entries[0].id}`}>
        <div className={styles.wrap}>
          <img src={icons(task.title)} className={styles.icon} alt={task.title} />
          <div className={styles.titleWrap}>
            <div className={styles.title}>{task.title}</div>
            <div className={styles.duration}>{timeString(task.entries[0].duration)}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        entry_date: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default function TaskPanel() {
  const date = useSelector(selectDate);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  useEffect(() => dispatch(loadTasks(date)), []);

  if (!tasks) {
    return <LoadingPanel text="Loading tasks ..." />;
  }

  return (
    <div className={styles.container}>
      {tasks.map((t) => <Task task={t} key={t.title} />)}
    </div>
  );
}
