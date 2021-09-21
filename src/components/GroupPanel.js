import { useDispatch, useSelector } from 'react-redux';
import GroupLink from './GroupLink';
import LoadingPanel from './LoadingPanel';
import { loadGroups, selectGroups, selectTasks } from '../reducers/tasksSlice';

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
  const dispatch = useDispatch();

  dispatch(loadGroups());

  if (!(groups && tasks)) {
    return <LoadingPanel text="Loading groups ..." />;
  }

  const filtered = [];

  groups.forEach((g) => {
    const duration = tasks.reduce((accm, current) => {
      if (current.group_id === g.id) return accm + current.entries[0].duration;
      return accm;
    }, 0);
    filtered.push({ ...g, duration });
  });

  return (
    <div style={styles.container}>
      {filtered.map(
        (g) => <GroupLink key={g.title} id={g.id} label={g.title} duration={g.duration} />,
      )}
    </div>
  );
}
