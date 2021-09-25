import { formattedDate } from '../utilities/dates';

const styles = {
  container: {
    width: '100%',
    padding: '15px',
    textAlign: 'center',
  },
};

export default function DatePanel() {
  const date = formattedDate();

  return (
    <div style={styles.container}>
      {date}
    </div>
  );
}
