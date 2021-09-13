import GroupPanel from '../containers/GroupPanel';
import styles from '../assets/css/App.module.css';

function App() {
  return (
    <div className={styles.content}>
      <header>
        <h1>Track.it</h1>
      </header>
      <GroupPanel />
    </div>
  );
}

export default App;
