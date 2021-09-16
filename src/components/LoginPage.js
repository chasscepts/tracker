import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import mb from '../assets/css/MobileInput.module.css';
import {
  selectLoginError, login, selectToken,
} from '../reducers/authSlice';
import LdsRing from './LdsRing';

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
  controls: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
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

function BusyIndicator() {
  return (
    <div style={{ ...styles.btn, ...styles.busy }}>
      <LdsRing width={30} color="#fff" />
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');
  const [busy, setBusy] = useState(false);
  const error = useSelector(selectLoginError);
  const token = useSelector(selectToken);
  const state = useLocation();
  const dispatch = useDispatch();

  if (token) {
    return <Redirect to={state?.from || '/'} />;
  }
  if (error && busy) {
    setBusy(false);
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
        <h2>Sign In</h2>
        {error && <div style={styles.error}>{error}</div>}
        <input className={mb.text} type="text" name="email" value={email} placeholder="Enter Email" onChange={handleTextChange} />
        <input className={mb.text} type="password" name="password" value={password} placeholder="Enter Password" onChange={handleTextChange} />
        {
          busy ? <BusyIndicator /> : <button style={styles.btn} type="button" onClick={handleSubmit}>Log In</button>
        }
        <div style={styles.controls}>
          <Link to="/register" style={styles.link}>Register</Link>
        </div>
      </div>
    </div>
  );
}
