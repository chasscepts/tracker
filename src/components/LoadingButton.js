import PropTypes from 'prop-types';
import LdsRing from './LdsRing';

/* eslint-disable react/forbid-prop-types */

const lStyles = {
  btn: {
    fontWeight: 'bold,',
    fontSize: '1.4rem',
    lineHeight: 1,
    borderRadius: '4px',
    boxShadow: '0 3px 9px rgb(0 0 0 / 5%)',
    transition: 'all 180ms',
    display: 'block',
    width: '100%',
    marginTop: '30px',
    padding: '15px',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#62b5e5',
    borderWidth: 0,
    cursor: 'pointer',
  },
  busy: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 15px',
    cursor: 'default',
  },
};

export default function LoadingButton({
  label, loading, styles, onClick, ringColor,
}) {
  if (!loading) {
    return <button style={{ ...lStyles.btn, ...styles }} type="button" onClick={onClick}>{label}</button>;
  }
  return (
    <div style={{ ...lStyles.btn, ...lStyles.busy, ...styles }}>
      <LdsRing width={30} color={ringColor} />
    </div>
  );
}

LoadingButton.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  styles: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  ringColor: PropTypes.string,
};

LoadingButton.defaultProps = {
  loading: false,
  styles: {},
  ringColor: '#fff',
};
