import study from '../assets/images/school.png';
import office from '../assets/images/office.png';
import meals from '../assets/images/coffee.png';
import sleep from '../assets/images/night.png';
import exercise from '../assets/images/sneaker.png';
import game from '../assets/images/game.png';
import task from '../assets/images/task.png';

const icons = (title) => {
  switch (title) {
    case 'Study':
      return study;
    case 'Office':
      return office;
    case 'Meals':
      return meals;
    case 'Sleep':
      return sleep;
    case 'Exercise':
      return exercise;
    case 'Games':
      return game;
    default:
      return task;
  }
};

export default icons;
