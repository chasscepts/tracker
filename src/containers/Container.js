import PropTypes from 'prop-types';
import styles from '../assets/css/Container.module.css';
import BottomNavigation from './BottomNavigation';

export default function Container({ Left, Right, home }) {
  let {
    right, left, container, leftChild,
  } = styles;

  if (home) {
    right = `${right} ${styles.extra}`;
    left = `${left} ${styles.page}`;
  } else {
    leftChild = `${leftChild} ${styles.extra}`;
    left = `${left} ${styles.extra}`;
    right = `${right} ${styles.page}`;
    container = `${container} ${styles.column}`;
  }

  return (
    <div className={container}>
      <div className={left}>
        <div className={leftChild}><Left /></div>
        <div className={styles.nav}><BottomNavigation /></div>
      </div>
      <div className={right}><Right /></div>
    </div>
  );
}

Container.propTypes = {
  Left: PropTypes.elementType.isRequired,
  Right: PropTypes.elementType.isRequired,
  home: PropTypes.bool,
};

Container.defaultProps = {
  home: false,
};
