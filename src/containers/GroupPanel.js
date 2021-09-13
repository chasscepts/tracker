import GroupStatus from '../components/GroupStatus';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  },
};

const hours = (hr) => 3600 * hr;

const randomHours = () => hours(1 + Math.floor(12 * Math.random()));

export default function GroupPanel() {
  const groups = [
    { label: 'Work', duration: randomHours() },
    { label: 'Essentials', duration: randomHours() },
    { label: 'Leisure', duration: randomHours() },
  ];

  return (
    <div style={styles.container}>
      {groups.map(
        (group) => <GroupStatus key={group.label} label={group.label} duration={group.duration} />,
      )}
    </div>
  );
}
