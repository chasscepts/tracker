import { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import css from '../assets/css/Stopwatch.module.css';
import btn from '../assets/css/button.module.css';
import sphere from '../assets/images/sphere.png';
import timer from '../utilities/timer';
import { selectEntryPendingRequestCount, updateEntryAsync } from '../reducers/timerSlice';
import LdsRing from './LdsRing';
import { timeStringClock, timeString } from '../utilities/dates';
import { selectTasks } from '../reducers/tasksSlice';

const styles = {
  ml20: {
    marginLeft: '20px',
  },
};

function Display({ time }) {
  return <div className={css.time}>{timeStringClock(time)}</div>;
}

Display.propTypes = {
  time: PropTypes.number,
};

Display.defaultProps = {
  time: 0,
};

const cocurrentMsg = `Timer is already started for another task!
Cocurrent recording of tasks is not yet supported. Commit or Discard old session to load current path.`;

function MessageBoard({ msg, type }) {
  if (!msg) return <></>;
  return (
    <div className={css[type]}>{msg}</div>
  );
}

MessageBoard.propTypes = {
  msg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  type: PropTypes.string,
};

MessageBoard.defaultProps = {
  msg: false,
  type: 'info',
};

function UpdatingIndicator({ count }) {
  if (count === 0) return <></>;
  const entry = count === 1 ? 'Entry' : 'Entries';

  return (
    <div className={css.loader}>
      <LdsRing width={20} color="#62b5e5" />
      <div className={css.loaderText}>
        {`Updating ${count} ${entry}`}
      </div>
    </div>
  );
}

UpdatingIndicator.propTypes = {
  count: PropTypes.number.isRequired,
};

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(timer.running());
  const client = timer.getClient();
  const tasks = useSelector(selectTasks);
  const requestCount = useSelector(selectEntryPendingRequestCount);
  const dispatch = useDispatch();
  const { taskId: pathTaskId, id: pathId } = useParams();

  const timerId = timer.subscribe((seconds) => {
    setElapsed(seconds);
  });

  useEffect(() => () => timer.unsubscribe(timerId));

  let id;
  let newRecord = false;
  let task;
  let entry;

  if (client) {
    id = client.id;
    task = tasks && tasks.find((t) => t.id === client.task_id);
    if (running && pathId && client.id !== +pathId) {
      newRecord = true;
    }
  } else if (pathId) {
    id = +pathId;
    task = tasks && tasks.find((t) => t.id === +pathTaskId);
  }

  if (task) {
    entry = task.entries.find((e) => e.id === id);
  }

  const title = (task && task.title) || null;

  const btnClass = (color) => `${btn.btn} ${btn[color]} ${btn.round}`;

  const handClass = running ? `${css.hand} ${css.active}` : css.hand;

  const startTimer = () => {
    if (!entry) {
      return;
    }
    timer.start({ id: entry.id, task_id: task.id });
    setTimeout(() => setRunning(true), 0);
  };

  const commit = () => {
    if (!entry) return;
    timer.stop();
    setRunning(false);
    dispatch(updateEntryAsync(entry, timer.elapsedTime(), task.title));
    if (newRecord) {
      <Redirect to={`/tasks/${pathTaskId}/entries/${pathId}`} />;
    }
  };

  const discard = () => {
    timer.stop();
    setRunning(false);
    setElapsed(0);
    if (newRecord) {
      <Redirect to={`/tasks/${pathTaskId}/entries/${pathId}`} />;
    }
  };

  return (
    <div className={css.container}>
      <div className={css.stopwatch}>
        <div className={css.handWrap}>
          <div className={handClass}>
            <img className={css.sphere} src={sphere} alt="sphere" />
          </div>
        </div>
        <Display time={elapsed} />
      </div>
      <UpdatingIndicator count={requestCount} />
      {entry && (
      <div className={css.entryWrap}>
        {`${title}: ${timeString(entry.duration)} recorded`}
      </div>
      )}
      {!entry && (
      <div className={css.entryWrap}>
        No Task Selected
      </div>
      )}
      <MessageBoard msg={newRecord && cocurrentMsg} type="error" />
      <div className={css.controls}>
        {running && (
        <>
          <button className={btnClass('blue')} type="button" onClick={commit}>Commit Record</button>
          <button className={btnClass('red')} type="button" onClick={discard} style={styles.ml20}>Discard</button>
        </>
        )}
        {!running && entry && (
        <button className={btnClass('blue')} type="button" onClick={startTimer}>Start Task</button>
        )}
        {!running && !entry && (
        <div className={css.notSelected}>Please Select a Task</div>
        )}
      </div>
    </div>
  );
}
