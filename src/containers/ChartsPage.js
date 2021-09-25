import Container from './Container';
import Home from '../components/Home';
import Charts from '../components/Charts';

export default function HopePage() {
  return <Container Left={Home} Right={Charts} isHome={false} />;
}
