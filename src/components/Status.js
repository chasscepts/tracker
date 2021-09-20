import PropTypes from 'prop-types';

const barMeasurement = {
  width: 4.25,
  half: 2.125,
  fourFifth: 3.4,
  twoFifth: 1.7,
};

const scaleSize = (property, size) => `${barMeasurement[property] * size}rem`;

const bar = (size) => ({
  position: 'absolute',
  height: '100%',
  width: '100%',
  background: '#e8e8e8',
  borderRadius: '100%',
  clip: `rect(0px, ${scaleSize('width', size)}, ${scaleSize('width', size)}, ${scaleSize('half', size)})`,
});

const progress = (color, size) => ({
  position: 'absolute',
  height: '100%',
  width: '100%',
  borderRadius: '100%',
  clip: `rect(0px, ${scaleSize('half', size)}, ${scaleSize('width', size)}, 0px)`,
  background: color,
});

const styles = {
  circular: (size) => ({
    height: scaleSize('width', size),
    width: scaleSize('width', size),
    position: 'relative',
    margin: 'auto',
  }),
  inner: (size) => ({
    position: 'absolute',
    zIndex: 6,
    top: '50%',
    left: '50%',
    height: scaleSize('fourFifth', size),
    width: scaleSize('fourFifth', size),
    margin: `-${scaleSize('twoFifth', size)} 0 0 -${scaleSize('twoFifth', size)}`,
    background: '#fff',
    borderRadius: '100%',
  }),
  leftBar: (size) => ({
    ...bar(size),
  }),
  rightBar: (size) => ({
    ...bar(size),
    transform: 'rotate(180deg)',
    zIndex: 3,
  }),
  leftProgress: (angle, color, size) => ({
    ...progress(color, size),
    zIndex: 1,
    transform: `rotate(${angle}deg)`,
  }),
  rightProgress: (angle, color, size) => ({
    ...progress(color, size),
    transform: `rotate(${angle}deg)`,
  }),
};

export default function Status({
  duration, factor, size, children,
}) {
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
    <div style={styles.circular(size)}>
      <div style={styles.inner(size)} />
      <div>
        <div style={styles.leftBar(size)}>
          <div style={styles.leftProgress(rotateLeft, color, size)} />
        </div>
        <div style={styles.rightBar(size)}>
          <div style={styles.rightProgress(rotateRight, color, size)} />
        </div>
      </div>
      {children}
    </div>
  );
}

Status.propTypes = {
  duration: PropTypes.number,
  factor: PropTypes.number,
  children: PropTypes.element,
  size: PropTypes.number,
};

Status.defaultProps = {
  duration: 0,
  factor: 3,
  children: null,
  size: 1,
};
