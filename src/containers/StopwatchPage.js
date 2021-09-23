import Container from './Container';
import Home from '../components/Home';
import Stopwatch from '../components/Stopwatch';

export default function HopePage() {
  return <Container Left={Home} Right={Stopwatch} isHome={false} />;
}
