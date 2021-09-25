import Container from './Container';
import Home from '../components/Home';
import GroupDetails from '../components/GroupDetails';

export default function HopePage() {
  return <Container Left={Home} Right={GroupDetails} isHome={false} />;
}
