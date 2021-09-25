import Container from './Container';
import Home from '../components/Home';
import NewTask from '../components/NewTask';

export default function HopePage() {
  return <Container Left={Home} Right={NewTask} isHome={false} />;
}
