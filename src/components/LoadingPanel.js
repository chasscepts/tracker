import PropTypes from 'prop-types';
import LdsRing from './LdsRing';
import { COLORS } from '../utilities';

const styles = {
  container: {
    width: '100%',
    minHeight: '180px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: '30px',
  },
};

export default function LoadingPanel({ text, width }) {
  return (
    <div style={styles.container}>
      <LdsRing width={width} color={COLORS.primary} />
      <div style={styles.text}>{text}</div>
    </div>
  );
}

LoadingPanel.propTypes = {
  text: PropTypes.string,
  width: PropTypes.number,
};

LoadingPanel.defaultProps = {
  text: 'Loading ...',
  width: 40,
};
