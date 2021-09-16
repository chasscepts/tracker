import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from '../assets/css/App.module.css';
import RestrictedRoute from './RestrictedRoute';
import AppHeader from './AppHeader';
import Home from './Home';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';

function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <AppHeader />
        <Switch>
          <RestrictedRoute exact path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
