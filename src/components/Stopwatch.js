import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import css from '../assets/css/Stopwatch.module.css';
import btn from '../assets/css/button.module.css';
import sphere from '../assets/images/sphere.png';
import timer from '../utilities/timer';
import {
  commitNext, selectEntry, selectEntryPendingRequestCount, selectEntryUpdateError,
  selectEntryUpdateSuccess, selectNextEntry, updateEntry,
} from '../reducers/timerSlice';
import LdsRing from './LdsRing';
import { dates } from '../utilities';

const styles = {
  ml20: {
    marginLeft: '20px',
  },
};

function Display({ time }) {
  return <div className={css.time}>{dates.timeStringClock(time)}</div>;
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
      <LdsRing width={30} color="#62b5e5" />
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
  const { nextEntry } = useSelector(selectNextEntry);
  const successMsg = useSelector(selectEntryUpdateSuccess);
  const errorMsg = useSelector(selectEntryUpdateError);
  const requestCount = useSelector(selectEntryPendingRequestCount);
  const dispatch = useDispatch();

  if (!entry) {
    return <Redirect to="/" />;
  }

  if (!running && nextEntry && nextEntry.id !== entry.id) {
    dispatch(commitNext());
    return <></>;
  }

  const hasNext = (running && nextEntry && entry.id !== nextEntry.id) || false;

  const btnClass = (color) => `${btn.btn} ${btn[color]} ${btn.round}`;

  const handClass = running ? `${css.hand} ${css.active}` : css.hand;

  const timerId = timer.subscribe((seconds) => {
    setElapsed(seconds);
  });

  const startTimer = () => {
    timer.start();
    setRunning(true);
  };

  const commit = () => {
    timer.stop();
    setRunning(false);
    dispatch(updateEntry(entry, timer.elapsedTime(), title));
    if (hasNext) {
      dispatch(commitNext());
    }
  };

  const discard = () => {
    timer.stop();
    setRunning(false);
    setElapsed(0);
  };

  useEffect(() => () => timer.unsubscribe(timerId));

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
        {`${title}: ${dates.timeString(entry.duration)} recorded`}
      </div>
      <MessageBoard msg={successMsg} type="success" />
      <MessageBoard msg={errorMsg} type="error" />
      <MessageBoard msg={cocurrentMsg && hasNext} type="error" />
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
