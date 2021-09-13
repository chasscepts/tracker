import GroupPanel from '../containers/GroupPanel';
import styles from '../assets/css/App.module.css';
import DatePanel from './DatePanel';

function App() {
  return (
    <div className={styles.content}>
      <header>
        <h1>Track.it</h1>
      </header>
      <DatePanel />
      <GroupPanel />
    </div>
  );
}

export default App;
