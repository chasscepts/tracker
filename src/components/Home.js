import AppHeader from './AppHeader';
import DatePanel from './DatePanel';
import GroupPanel from '../containers/GroupPanel';
import TaskPanel from '../containers/TaskPanel';

export default function Home() {
  return (
    <>
      <AppHeader />
      <DatePanel />
      <GroupPanel />
      <TaskPanel />
    </>
  );
}
