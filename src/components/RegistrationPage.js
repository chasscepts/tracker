import { useState } from 'react';
import mb from '../assets/css/MobileInput.module.css';

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
    backgroundColor: '#9e0606',
    borderWidth: 0,
  },
  link: {
    color: '#62b5e5',
    textDecoration: 'underline',
  },
};

export default function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');

  const handleTextChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassord(value);
    }
  };

  const handleSubmit = () => {

  };

  return (
    <div style={styles.container}>
      <div style={styles.innerWrap}>
        <h2>Registration</h2>
        <input className={mb.text} type="text" name="email" value={email} placeholder="Enter Email" onChange={handleTextChange} />
        <input className={mb.text} type="password" name="password" value={password} placeholder="Enter Password" onChange={handleTextChange} />
        <button style={styles.btn} type="button" onClick={handleSubmit}>Register</button>
        <div style={styles.controls}>
          <span style={styles.link}>Login</span>
        </div>
      </div>
    </div>
  );
}
