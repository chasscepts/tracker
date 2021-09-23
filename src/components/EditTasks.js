import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../utilities';
import { today } from '../utilities/dates';
import button from '../assets/css/button.module.css';
import {
  selectUpdateTaskRequestCount,
  selectTasks,
  loadTasks,
  deleteTaskAsync,
  updateTaskAsync,
} from '../reducers/tasksSlice';
import LdsRing from './LdsRing';
import LoadingPanel from './LoadingPanel';

const styles = {
  container: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '15px',
    margin: '5px auto 15px',
  },
  h2: {
    marginBottom: '15px',
    color: COLORS.primary,
    borderBottom: `1px dotted ${COLORS.primary}`,
    paddingBottom: '5px',
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
  deleteBtn: {
    marginLeft: '20px',
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
  tasksPanelWrap: {
    flex: 1,
    overflow: 'auto',
  },
  tasksPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'row wrap',
    padding: '10px',
  },
  taskBtn: {
    width: '80px',
    height: '80px',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    borderRadius: '4px',
    margin: '10px',
    cursor: 'pointer',
    color: 'inherit',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  activeTaskBtn: {
    backgroundColor: COLORS.primary,
    color: '#fff',
  },
  taskBtnText: {
    pointerEvents: 'none',
  },
  selectedTask: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
    marginBottom: '5px',
  },
  noSelectedTask: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
    marginBottom: '5px',
    color: COLORS.red,
  },
  selectedTaskLabel: {
    color: COLORS.primary,
  },
};

export default function EditTask() {
  const [title, setTitle] = useState('');
  const [selectedTask, selectTask] = useState(null);
  const requestCount = useSelector(selectUpdateTaskRequestCount);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  if (!tasks) {
    dispatch(loadTasks(today()));
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'title') {
      setTitle(value);
    }
  };

  const submitForm = () => {
    if (title && selectedTask) {
      dispatch(updateTaskAsync(selectedTask.id, title));
    }
  };

  const handleEnterKey = (evt) => {
    if (evt.key === 'Enter') {
      submitForm();
    }
  };

  const removeTask = () => {
    if (selectedTask) {
      dispatch(deleteTaskAsync(selectedTask.id));
      selectTask(null);
    }
  };

  const handleTaskClick = (evt) => {
    const { name } = evt.target;
    const task = tasks.find((t) => t.id === +name);
    selectTask(task);
    if (task) {
      setTitle(task.title);
    }
  };

  const btnStyle = (id) => {
    if (selectedTask && selectedTask.id === id) {
      return { ...styles.taskBtn, ...styles.activeTaskBtn };
    }
    return styles.taskBtn;
  };

  const loadingMessage = requestCount > 1
    ? `${requestCount} requests ongoing` : `${requestCount} request ongoing`;

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.h2}>Edit Task</h2>
        {requestCount > 0
        && (
        <div style={styles.loadingWrap}>
          <LdsRing width={20} color={COLORS.primary} />
          <div style={styles.loadingMsg}>{loadingMessage}</div>
        </div>
        )}
        {selectedTask && (
        <div style={styles.selectedTask}>
          <span style={styles.selectedTaskLabel}>Selected Task: </span>
          <span>{selectedTask.title}</span>
        </div>
        )}
        {!selectedTask && (
        <div style={styles.noSelectedTask}>You have not selected any task</div>
        )}
        <input
          style={styles.input}
          name="title"
          value={title}
          onChange={handleChange}
          onKeyDown={handleEnterKey}
          placeholder="Enter New Title"
        />
        <div style={styles.controls}>
          <button
            className={`${button.btn} ${button.blue} ${button.round}`}
            type="button"
            onClick={submitForm}
          >
            Edit
          </button>
          <button
            style={styles.deleteBtn}
            className={`${button.btn} ${button.red} ${button.round}`}
            type="button"
            onClick={removeTask}
          >
            Delete
          </button>
        </div>
      </div>
      {tasks && (
      <div style={styles.tasksPanelWrap}>
        <div style={styles.tasksPanel}>
          {tasks.map((t) => (
            <button
              style={btnStyle(t.id)}
              key={t.title}
              name={t.id}
              type="button"
              onClick={handleTaskClick}
            >
              <span style={styles.taskBtnText}>{t.title}</span>
            </button>
          ))}
        </div>
      </div>
      )}
      {!tasks && (
      <LoadingPanel />
      )}
    </div>
  );
}
