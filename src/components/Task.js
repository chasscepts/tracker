import PropTypes from 'prop-types';
import styles from '../assets/css/Task.module.css';

export default function Task({ title, duration, icon }) {
  return (
    <button type="button" className={styles.btn}>
      <div className={styles.wrap}>
        <img src={icon} className={styles.icon} alt={title} />
        <div>
          <div>{title}</div>
          <div>{duration}</div>
        </div>
      </div>
    </button>
  );
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
};
