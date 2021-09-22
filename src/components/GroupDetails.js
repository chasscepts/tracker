import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import styles from '../assets/css/GroupDetails.module.css';
import {
  loadGroupTasks,
  selectDetailsGroup,
  selectDetailsHasPendingError,
} from '../reducers/detailsSlice';
import LoadingPanel from './LoadingPanel';
import { today, format } from '../utilities/dates';
import Status from './Status';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (date) => {
  const indices = date.split('-');
  return `${shortMonths[+indices[1] - 1]} ${indices[2]} ${indices[0]}`;
};

const Label = ({ label }) => <div className={styles.label}>{label}</div>;

Label.propTypes = {
  label: PropTypes.string.isRequired,
};

function Row({
  title,
  date,
  duration,
  difference,
}) {
  const diff = difference > 0 ? `+${difference}` : difference;
  return (
    <div className={styles.row}>
      <div className={styles.leftWrap}>
        <div className={styles.statusWrap}>
          <Status duration={duration} size={0.5} />
        </div>
        <div>
          <div className={styles.date}>{formatDate(date)}</div>
          <div className={styles.titleWrap}>
            <span className={styles.title}>{title}</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
      <div>
        <span className={styles.difference}>{diff}</span>
        <span>secs</span>
      </div>
    </div>
  );
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  difference: PropTypes.number.isRequired,
};

const getDiff = (durations, keys, date, index) => {
  const prevDate = keys[index];
  if (!prevDate) return 0;
  return durations[date] - durations[prevDate];
};

const getRow = (title, date, durations, keys, pointer) => (
  <Row
    title={title}
    date={date}
    duration={durations[date]}
    difference={getDiff(durations, keys, date, pointer)}
  />
);

const previousDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);

const getMonth = (date) => months[+date.split('-')[1]];

function getComponents(title, durations) {
  const keys = Object.keys(durations).sort((a, b) => {
    if (b > a) return 1;
    if (b < a) return -1;
    return 0;
  });
  const { length } = keys;
  if (length === 0) return <></>;
  const components = [];
  let pointer = 0;
  let currentDate = new Date();
  const yesterday = previousDay(currentDate);
  let weekDay = currentDate.getDay();
  let date = keys[pointer];
  components.push(<Label label="Today" />);

  if (date === today()) {
    pointer += 1;
    components.push(getRow(title, date, durations, keys, pointer));
    date = keys[pointer];
  }

  components.push(<Label label="YesterDay" />);
  if (pointer >= length) return components;

  currentDate = previousDay(currentDate);
  weekDay -= 1;

  if (weekDay >= 0 && date === format(yesterday)) {
    pointer += 1;
    components.push(getRow(title, date, durations, keys, pointer));
    date = keys[pointer];
  }

  currentDate = previousDay(currentDate);
  weekDay -= 1;

  while (weekDay >= 0) {
    if (pointer >= length) return components;
    components.push(<Label label={weekDays[weekDay]} />);
    if (date === format(currentDate)) {
      pointer += 1;
      components.push(getRow(title, date, durations, keys, pointer));
      date = keys[pointer];
    }
    currentDate = previousDay(currentDate);
    weekDay -= 1;
  }

  components.push(<Label label="Last Week" />);
  weekDay = 6;
  while (weekDay >= 0) {
    if (pointer >= length) return components;
    if (date === format(currentDate)) {
      pointer += 1;
      components.push(getRow(title, date, durations, keys, pointer));
      date = keys[pointer];
    }
    currentDate = previousDay(currentDate);
    weekDay -= 1;
  }

  let month;

  while (pointer < length) {
    const m = getMonth(date);
    if (m !== month) {
      components.push(<Label label={m} />);
      month = m;
    }
    pointer += 1;
    components.push(getRow(title, date, durations, keys, pointer));
    date = keys[pointer];
  }

  return components;
}

export default function GroupDetails() {
  const params = useParams();
  const loading = useSelector(selectDetailsHasPendingError);
  const group = useSelector(selectDetailsGroup);
  const dispatch = useDispatch();

  const { id, title: pageTitle } = params;

  dispatch(loadGroupTasks(id, pageTitle));

  if (loading || !group) return <LoadingPanel text="Loading group ..." width={60} />;

  const { tasks, title } = group;
  const durations = tasks.reduce(
    (accm, task) => task.entries.reduce((accm2, entry) => {
      const d = entry.entry_date;
      let sum = accm2[d];
      if (!sum) sum = 0;
      return { ...accm2, [d]: sum + entry.duration };
    }, accm),
    {},
  );

  const components = getComponents(title, durations);

  return (
    <div className={styles.container}>
      <div>{components}</div>
    </div>
  );
}
