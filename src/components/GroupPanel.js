import { useDispatch, useSelector } from 'react-redux';
import GroupStatus from './GroupStatus';
import LoadingPanel from './LoadingPanel';
import {
  loadGroups, selectDate, selectGroups, selectTasks,
} from '../reducers/tasksSlice';
import { taskDuration } from '../utilities';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
  },
};

export default function GroupPanel() {
  const groups = useSelector(selectGroups);
  const tasks = useSelector(selectTasks);
  const date = useSelector(selectDate);
  const dispatch = useDispatch();

  dispatch(loadGroups());

  if (!groups) {
    return <LoadingPanel text="Loading groups ..." />;
  }

  const filtered = [];

  if (tasks) {
    groups.forEach((g) => {
      const duration = tasks.reduce((accm, current) => {
        if (current.id === g.id) return accm + taskDuration(current, date);
        return accm;
      }, 0);
      filtered.push({ ...g, duration });
    });
  } else {
    groups.forEach((group) => {
      filtered.push({ ...group, duration: 0 });
    });
  }

  return (
    <div style={styles.container}>
      {filtered.map(
        (group) => <GroupStatus key={group.title} label={group.title} duration={group.duration} />,
      )}
    </div>
  );
}
