import { useDispatch } from 'react-redux';
import DatePanel from './DatePanel';
import GroupPanel from './GroupPanel';
import TaskPanel from './TasksPanel';
import { setDate } from '../reducers/tasksSlice';
import { dates } from '../utilities';

export default function Home() {
  const dispatch = useDispatch();

  dispatch(setDate(dates.today()));

  return (
    <>
      <DatePanel />
      <GroupPanel />
      <TaskPanel />
    </>
  );
}
