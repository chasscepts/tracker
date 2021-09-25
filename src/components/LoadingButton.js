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
  type, label, loading, styles, onClick, ringColor,
}) {
  if (!loading) {
    return (
      <button
        style={{ ...lStyles.btn, ...styles }}
        type={type === 'submit' ? 'submit' : 'button'}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
  return (
    <div style={{ ...lStyles.btn, ...lStyles.busy, ...styles }}>
      <LdsRing width={30} color={ringColor} />
    </div>
  );
}

LoadingButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  styles: PropTypes.object,
  onClick: PropTypes.func,
  ringColor: PropTypes.string,
};

LoadingButton.defaultProps = {
  type: 'button',
  loading: false,
  styles: {},
  ringColor: '#fff',
  onClick: null,
};
