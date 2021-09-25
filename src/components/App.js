import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from '../assets/css/App.module.css';
import RestrictedRoute from './RestrictedRoute';
import AppHeader from './AppHeader';
import HomePage from '../containers/HomePage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import StopwatchPage from '../containers/StopwatchPage';
import GroupDetailsPage from '../containers/GroupDetailsPage';
import NewTaskPage from '../containers/NewTaskPage';
import EditTasksPage from '../containers/EditTaskPage';
import ChartsPage from '../containers/ChartsPage';
import Feedbacks from './Feedbacks';

function App() {
  return (
    <div className={styles.container}>
      <Feedbacks />
      <BrowserRouter>
        <AppHeader />
        <main className={styles.page}>
          <Switch>
            <RestrictedRoute exact path="/" component={HomePage} />
            <RestrictedRoute path="/tasks/:taskId/entries/:id" component={StopwatchPage} />
            <RestrictedRoute path="/group/:title/:id" component={GroupDetailsPage} />
            <RestrictedRoute path="/new" component={NewTaskPage} />
            <RestrictedRoute path="/edit" component={EditTasksPage} />
            <RestrictedRoute path="/charts" component={ChartsPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegistrationPage} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
