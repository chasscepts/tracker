import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../utilities';
import button from '../assets/css/button.module.css';
import {
  selectCreateTaskError,
  selectCreateTaskRequestCount,
  setCreateTaskError,
  selectGroups,
  loadGroups,
  createTask,
} from '../reducers/tasksSlice';
import LdsRing from './LdsRing';

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inner: {
    width: '100%',
    maxWidth: '350px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '15px',
    overflow: 'auto',
  },
  h2: {
    marginBottom: '15px',
    color: COLORS.primary,
    borderBottom: `1px dotted ${COLORS.primary}`,
    paddingBottom: '5px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    marginBottom: '3px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '7px',
    border: '1px solid #ddd',
    marginBottom: '15px',
    color: 'inherit',
  },
  controls: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  loadingWrap: {
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #eee',
    boxShadow: '0 0 1px 1px',
    borderRadius: '5px',
    marginBottom: '15px',
  },
  loadingMsg: {
    marginLeft: '10px',
  },
  error: {
    position: 'relative',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    padding: '8px',
    color: COLORS.red,
    border: '1px solid #ddd',
    textAlign: 'center',
    marginBottom: '15px',
    maxHeight: '150px',
    overflow: 'auto',
  },
  errorBtn: {
    position: 'absolute',
    right: '3px',
    top: '3px',
    padding: 0,
    border: 'none',
    color: COLORS.red,
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
};

export default function NewTask() {
  const [groupId, setGroupId] = useState('');
  const [title, setTitle] = useState('');
  const errorMsg = useSelector(selectCreateTaskError);
  const requestCount = useSelector(selectCreateTaskRequestCount);
  const groups = useSelector(selectGroups);
  const dispatch = useDispatch();

  let options = [];
  if (groups) {
    options = groups;
    if (!groupId) {
      setGroupId(options[0].id);
    }
  } else {
    setTimeout(() => dispatch(loadGroups()), 0);
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'id') {
      setGroupId(value);
    } else if (name === 'title') {
      setTitle(value);
    }
  };

  const clearError = () => dispatch(setCreateTaskError(null));

  const submitForm = () => {
    if (groupId && title) {
      dispatch(createTask(groupId, title));
    }
  };

  const loadingMessage = requestCount > 1 ? `${requestCount} requests ongoing` : `${requestCount} request ongoing`;

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <h2 style={styles.h2}>New Task</h2>
        {requestCount > 0
        && (
        <div style={styles.loadingWrap}>
          <LdsRing width={20} color={COLORS.primary} />
          <div style={styles.loadingMsg}>{loadingMessage}</div>
        </div>
        )}
        {errorMsg
        && (
        <div style={styles.error}>
          <button style={styles.errorBtn} type="button" onClick={clearError}>X</button>
          <div>{errorMsg}</div>
        </div>
        )}
        <div style={styles.label}>Please Select Task Category</div>
        <select style={styles.input} name="id" value={groupId} onChange={handleChange}>
          {options.map((g) => <option key={g.title} value={g.id}>{g.title}</option>)}
        </select>
        <div style={styles.label}>Enter Title</div>
        <input style={styles.input} name="title" value={title} onChange={handleChange} />
        <div style={styles.controls}>
          <button
            className={`${button.btn} ${button.blue} ${button.round}`}
            type="button"
            onClick={submitForm}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
