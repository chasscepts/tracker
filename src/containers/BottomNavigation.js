import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import home from '../assets/images/home.png';
import plus from '../assets/images/plus.png';
import editTask from '../assets/images/edit-task.png';
import chart from '../assets/images/chart.png';
import styles from '../assets/css/BottomNavigation.module.css';
import { selectUser } from '../reducers/authSlice';

function Item({
  icon, path, label, matches,
}) {
  const { pathname } = useLocation();
  let navClass = styles.nav;
  if (pathname === path || matches.indexOf(pathname) >= 0) {
    navClass = `${navClass} ${styles.active}`;
  }

  return (
    <Link to={path}>
      <div className={navClass}>
        <img src={icon} alt={path} />
        <div className={styles.label}>{label}</div>
      </div>
    </Link>
  );
}

Item.propTypes = {
  icon: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  matches: PropTypes.arrayOf(PropTypes.string),
};

Item.defaultProps = {
  matches: [],
};

export default function BottomNavigation() {
  const user = useSelector(selectUser);
  if (!user) return <></>;

  return (
    <div className={styles.container}>
      <Item icon={home} path="/" label="Home" matches={['/timer']} />
      <Item icon={plus} path="/new" label="New Task" />
      <Item icon={editTask} path="/edit" label="Edit Tasks" />
      <Item icon={chart} path="/charts" label="Charts" />
    </div>
  );
}
