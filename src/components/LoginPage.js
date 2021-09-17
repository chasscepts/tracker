import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import mb from '../assets/css/MobileInput.module.css';
import {
  selectLoginError, login, selectUser, clearLoginError,
} from '../reducers/authSlice';
import { COLORS } from '../utilities';
import LoadingButton from './LoadingButton';

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '30px',
  },
  innerWrap: {
    position: 'relative',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
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
    color: '#9e0606',
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

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');
  const [localError, setLocalError] = useState(null);
  const [busy, setBusy] = useState(false);
  const error = useSelector(selectLoginError);
  const user = useSelector(selectUser);
  const state = useLocation();
  const dispatch = useDispatch();

  if (user) {
    return <Redirect to={state?.from || '/'} />;
  }
  if (error) {
    if (busy) {
      setBusy(false);
    }
    if (error !== localError) {
      setLocalError(error);
    }
    setTimeout(() => dispatch(clearLoginError()), 0);
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
      dispatch(login(email, password));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerWrap}>
        <h2 style={styles.h2}>Sign In</h2>
        {localError && <div style={styles.error}>{localError}</div>}
        <input className={mb.text} type="text" name="email" value={email} placeholder="Enter Email" onChange={handleTextChange} />
        <input className={mb.text} type="password" name="password" value={password} placeholder="Enter Password" onChange={handleTextChange} />
        <LoadingButton label="Log In" onClick={handleSubmit} loading={busy} />
        <div style={styles.controls}>
          <Link to="/register" style={styles.link}>Register</Link>
        </div>
      </div>
    </div>
  );
}
