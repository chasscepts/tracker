import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from '../assets/css/App.module.css';
import RestrictedRoute from './RestrictedRoute';
import AppHeader from './AppHeader';
import Home from './Home';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import Stopwatch from './Stopwatch';
import GroupDetails from './GroupDetails';
import BottomNavigation from '../containers/BottomNavigation';
import NewTask from './NewTask';
import EditTasks from './EditTasks';
import Charts from './Charts';
import Feedbacks from './Feedbacks';

function App() {
  return (
    <div className={styles.container}>
      <Feedbacks />
      <BrowserRouter>
        <AppHeader />
        <main className={styles.page}>
          <Switch>
            <RestrictedRoute exact path="/" component={Home} />
            <RestrictedRoute path="/timer" component={Stopwatch} />
            <RestrictedRoute path="/group/:title/:id" component={GroupDetails} />
            <RestrictedRoute path="/new" component={NewTask} />
            <RestrictedRoute path="/edit" component={EditTasks} />
            <RestrictedRoute path="/charts" component={Charts} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegistrationPage} />
          </Switch>
        </main>
        <footer><BottomNavigation /></footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
