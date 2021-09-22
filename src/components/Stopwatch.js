import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import css from '../assets/css/Stopwatch.module.css';
import btn from '../assets/css/button.module.css';
import sphere from '../assets/images/sphere.png';
import timer from '../utilities/timer';
import {
  commitNext, selectEntry, selectEntryPendingRequestCount,
  selectNextEntry, updateEntryAsync,
} from '../reducers/timerSlice';
import LdsRing from './LdsRing';
import { timeStringClock, timeString } from '../utilities/dates';

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

const cocurrentMsg = `Timer is already started for another task.
Cocurrent running of tasks is not yet supported.
Stop timer to load a new session.`;

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
  const { entry, title } = useSelector(selectEntry);
  const nextEntry = useSelector(selectNextEntry);
  const requestCount = useSelector(selectEntryPendingRequestCount);
  const dispatch = useDispatch();

  if (!entry) {
    return <Redirect to="/" />;
  }

  const timerId = timer.subscribe((seconds) => {
    setElapsed(seconds);
  });

  const canCommit = !running
    && nextEntry && nextEntry.entry && nextEntry.entry.id !== entry.id;

  useEffect(() => {
    if (canCommit) {
      dispatch(commitNext());
    }
    return () => timer.unsubscribe(timerId);
  });

  if (canCommit) {
    return <></>;
  }

  const hasNext = (
    running && nextEntry && nextEntry.entry && entry.id !== nextEntry.entry.id
  ) || false;

  const btnClass = (color) => `${btn.btn} ${btn[color]} ${btn.round}`;

  const handClass = running ? `${css.hand} ${css.active}` : css.hand;

  const startTimer = () => {
    timer.start();
    setRunning(true);
  };

  const commit = () => {
    timer.stop();
    setRunning(false);
    dispatch(updateEntryAsync(entry, timer.elapsedTime(), title));
    if (hasNext) {
      dispatch(commitNext());
    }
  };

  const discard = () => {
    timer.stop();
    setRunning(false);
    setElapsed(0);
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
      <div className={css.entryWrap}>
        {`${title}: ${timeString(entry.duration)} recorded`}
      </div>
      <MessageBoard msg={hasNext && cocurrentMsg} type="error" />
      <div className={css.controls}>
        {running && (
        <>
          <button className={btnClass('blue')} type="button" onClick={commit}>Commit Record</button>
          <button className={btnClass('red')} type="button" onClick={discard} style={styles.ml20}>Discard</button>
        </>
        )}
        {!running && <button className={btnClass('blue')} type="button" onClick={startTimer}>Start Task</button>}
      </div>
    </div>
  );
}
