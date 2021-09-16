import styles from '../assets/css/TaskPanel.module.css';
import study from '../assets/images/school.png';
import office from '../assets/images/office.png';
import meals from '../assets/images/coffee.png';
import sleep from '../assets/images/night.png';
import exercise from '../assets/images/sneaker.png';
import game from '../assets/images/game.png';
import Task from '../components/Task';

const tasks = [
  { title: 'Office', duration: 240, icon: office },
  { title: 'Study', duration: 300, icon: study },
  { title: 'Meals', duration: 180, icon: meals },
  { title: 'Sleep', duration: 200, icon: sleep },
  { title: 'Games', duration: 240, icon: game },
  { title: 'Exercise', duration: 360, icon: exercise },
];

export default function TaskPanel() {
  return (
    <div className={styles.container}>
      {tasks.map((t) => <Task title={t.title} duration={t.duration} icon={t.icon} key={t.title} />)}
    </div>
  );
}
