import { useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mb from '../assets/css/MobileInput.module.css';
import {
  clearRegistrationError,
  register, selectRegistrationError, selectRegistrationSuccess, selectUser, setRegistrationSuccess,
} from '../reducers/authSlice';
import LoadingButton from './LoadingButton';
import { COLORS } from '../utilities';

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
  },
  innerWrap: {
    position: 'relative',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
  },
  h2: {
    color: COLORS.primary,
  },
  controls: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  link: {
    color: '#62b5e5',
    textDecoration: 'underline',
  },
  error: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    padding: '15px 0',
  },
};

export default function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState(null);
  const user = useSelector(selectUser);
  const success = useSelector(selectRegistrationSuccess);
  const error = useSelector(selectRegistrationError);
  const dispatch = useDispatch();

  if (user) {
    return <Redirect to="/" />;
  }
  if (success) {
    setTimeout(() => dispatch(setRegistrationSuccess(false)), 0);
    return <Redirect to="/login" />;
  }
  if (error) {
    if (busy) {
      setBusy(false);
    }
    if (error !== localError) {
      setLocalError(error);
    }
    setTimeout(() => dispatch(clearRegistrationError()), 0);
  }

  const handleTextChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassord(value);
    }
  };

  const handleSubmit = () => {
    if (email && password) {
      setBusy(true);
      dispatch(register(email, password));
    }
  };

  return (
    <div style={styles.container} className="container">
      <div style={styles.innerWrap}>
        <h2 style={styles.h2}>Registration</h2>
        {localError && <div style={styles.error}>{localError}</div>}
        <input className={mb.text} type="text" name="email" value={email} placeholder="Enter Email" onChange={handleTextChange} />
        <input className={mb.text} type="password" name="password" value={password} placeholder="Enter Password" onChange={handleTextChange} />
        <LoadingButton label="Register" loading={busy} onClick={handleSubmit} styles={{ backgroundColor: '#9e0606' }} />
        <div style={styles.controls}>
          <Link to="/login" style={styles.link}>Login</Link>
        </div>
      </div>
    </div>
  );
}
