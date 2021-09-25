import Container from './Container';
import Home from '../components/Home';
import EditTasks from '../components/EditTasks';

export default function HopePage() {
  return <Container Left={Home} Right={EditTasks} isHome={false} />;
}
