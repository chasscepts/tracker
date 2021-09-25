import { useDispatch } from 'react-redux';
import DatePanel from './DatePanel';
import GroupPanel from './GroupPanel';
import TaskPanel from './TasksPanel';
import { setDate } from '../reducers/tasksSlice';
import { today } from '../utilities/dates';

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  middle: {
    flex: 1,
    overflow: 'auto',
  },
};

export default function Home() {
  const dispatch = useDispatch();

  dispatch(setDate(today()));

  return (
    <div style={styles.container}>
      <DatePanel />
      <GroupPanel />
      <div style={styles.middle}><TaskPanel /></div>
    </div>
  );
}
