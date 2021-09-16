import PropTypes from 'prop-types';
import css from '../assets/css/ldsRing.module.css';

const styles = {
  lds: (width) => ({
    width: `${width}px`,
    height: `${width}px`,
  }),
  ldsDiv: (width, color) => ({
    width: `${width}px`,
    height: `${width}px`,
    borderWidth: `${width / 10}px`,
    borderColor: `${color} transparent transparent transparent`,
  }),
};

export default function LdsRing({ width, color }) {
  return (
    <div style={styles.lds(width)} className={css.ldsRing}>
      <div style={styles.ldsDiv(width, color)} />
      <div style={styles.ldsDiv(width, color)} />
      <div style={styles.ldsDiv(width, color)} />
      <div style={styles.ldsDiv(width, color)} />
    </div>
  );
}

LdsRing.propTypes = {
  width: PropTypes.number,
  color: PropTypes.string,
};

LdsRing.defaultProps = {
  width: 80,
  color: '#fff',
};
