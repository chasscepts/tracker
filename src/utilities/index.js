export const COLORS = {
  primary: '#62b5e5',
  gray: '#67899c',
  red: '#9e0606',
  success: '#1e6d19',
};

export const taskDuration = (task, date) => {
  const entry = task.entries.find((entry) => entry.entry_date === date);
  return (entry && entry.duration) || 0;
};
