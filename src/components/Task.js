import PropTypes from 'prop-types';
import styles from '../assets/css/Task.module.css';
import { dates } from '../utilities';
import icons from '../utilities/icons';

export default function Task({ task, index, onClick }) {
  const handleClick = () => {
    onClick(index);
  };

  return (
    <div className={styles.container}>
      <button type="button" className={styles.btn} onClick={handleClick}>
        <div className={styles.wrap}>
          <img src={icons(task.title)} className={styles.icon} alt={task.title} />
          <div className={styles.titleWrap}>
            <div className={styles.title}>{task.title}</div>
            <div className={styles.duration}>{dates.timeString(task.entry.duration)}</div>
          </div>
        </div>
      </button>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    entry: PropTypes.shape({
      id: PropTypes.number.isRequired,
      entry_date: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
