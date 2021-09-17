import { useDispatch, useSelector } from 'react-redux';
import GroupStatus from '../components/GroupStatus';
import LoadingPanel from '../components/LoadingPanel';
import { loadGroups, selectGroups, selectTasks } from '../reducers/tasksSlice';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  },
};

export default function GroupPanel() {
  const groups = useSelector(selectGroups);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  dispatch(loadGroups());

  if (!groups) {
    return <LoadingPanel text="Loading groups ..." />;
  }

  const filtered = [];

  if (tasks) {
    groups.forEach((g) => {
      const duration = tasks.reduce((accm, current) => {
        if (current.id === g.id) return accm + current.entry.duration;
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
