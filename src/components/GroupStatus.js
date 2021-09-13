import PropTypes from 'prop-types';

const barMeasurement = {
  width: '4.25rem',
  half: '2.125rem',
  fourFifth: '3.4rem',
  twoFifth: '1.7rem',
};

const bar = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  background: '#e8e8e8',
  borderRadius: '100%',
  clip: `rect(0px, ${barMeasurement.width}, ${barMeasurement.width}, ${barMeasurement.half})`,
};

const progress = (color) => ({
  position: 'absolute',
  height: '100%',
  width: '100%',
  borderRadius: '100%',
  clip: `rect(0px, ${barMeasurement.half}, ${barMeasurement.width}, 0px)`,
  background: color,
});

const styles = {
  circular: {
    height: barMeasurement.width,
    width: barMeasurement.width,
    position: 'relative',
    margin: 'auto',
  },
  inner: {
    position: 'absolute',
    zIndex: 6,
    top: '50%',
    left: '50%',
    height: barMeasurement.fourFifth,
    width: barMeasurement.fourFifth,
    margin: `-${barMeasurement.twoFifth} 0 0 -${barMeasurement.twoFifth}`,
    background: '#fff',
    borderRadius: '100%',
  },
  leftBar: {
    ...bar,
  },
  rightBar: {
    ...bar,
    transform: 'rotate(180deg)',
    zIndex: 3,
  },
  leftProgress: (angle, color) => ({
    ...progress(color),
    zIndex: 1,
    transform: `rotate(${angle}deg)`,
  }),
  rightProgress: (angle, color) => ({
    ...progress(color),
    transform: `rotate(${angle}deg)`,
  }),
  percentWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '20001',
  },
  labelWrap: {
    textAlign: 'center',
  },
};

export default function GroupStatus({ label, duration, factor }) {
  const percent = Math.round(duration / 864);
  const angle = (percent) => (180 * percent) / 50;
  const color = percent < 100 / factor ? 'red' : 'green';

  let rotateLeft = 0;
  let rotateRight = 0;

  if (percent < 50) {
    rotateLeft = angle(percent);
  } else {
    rotateLeft = 180;
    rotateRight = 180 - angle(100 - percent);
  }

  return (
    <div>
      <div style={styles.circular}>
        <div style={styles.inner} />
        <div style={styles.circle}>
          <div style={styles.leftBar}>
            <div style={styles.leftProgress(rotateLeft, color)} />
          </div>
          <div style={styles.rightBar}>
            <div style={styles.rightProgress(rotateRight, color)} />
          </div>
        </div>
        <div style={styles.percentWrap}>
          <span>{`${percent}%`}</span>
        </div>
      </div>
      <div style={styles.labelWrap}>{label}</div>
    </div>
  );
}

GroupStatus.propTypes = {
  duration: PropTypes.number,
  factor: PropTypes.number,
  label: PropTypes.string.isRequired,
};

GroupStatus.defaultProps = {
  duration: 0,
  factor: 3,
};
