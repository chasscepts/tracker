import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Status from './Status';

const styles = {
  link: {
    color: '#67899c',
  },
  percentWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '20001',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#5c7380',
  },
  labelWrap: {
    textAlign: 'center',
  },
};

export default function GroupLink({
  id, label, duration, factor,
}) {
  const percent = Math.round(duration / 864);

  return (
    <Link to={`/group/${label}/${id}`}>
      <Status duration={duration} factor={factor}>
        <div style={styles.percentWrap}>
          <span>{`${percent}%`}</span>
        </div>
      </Status>
      <div style={styles.labelWrap}>{label}</div>
    </Link>
  );
}

GroupLink.propTypes = {
  id: PropTypes.number.isRequired,
  duration: PropTypes.number,
  factor: PropTypes.number,
  label: PropTypes.string.isRequired,
};

GroupLink.defaultProps = {
  duration: 0,
  factor: 3,
};
