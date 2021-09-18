import PropTypes from 'prop-types';
import styles from '../assets/css/Task.module.css';
import { taskDuration } from '../utilities';
import icons from '../utilities/icons';

export default function Task({ task, date }) {
  return (
    <button type="button" className={styles.btn}>
      <div className={styles.wrap}>
        <img src={icons(task.title)} className={styles.icon} alt={task.title} />
        <div>
          <div>{task.title}</div>
          <div>{taskDuration(task, date)}</div>
        </div>
      </div>
    </button>
  );
}

Task.propTypes = {
  date: PropTypes.string.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      entry_date: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
};
