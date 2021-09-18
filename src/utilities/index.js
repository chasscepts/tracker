export const COLORS = {
  primary: '#62b5e5',
  gray: '#67899c',
  red: '#9e0606',
};

export const dates = {
  /**
   * @returns string resentation of today that conforms to API format
   */
  today: () => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  },
  /**
   * @param {Date} date  Date object
   * @returns string representation of date that conforms to API format
   */
  format: (date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
};

export const taskDuration = (task, date) => {
  const entry = task.entries.find((entry) => entry.entry_date === date);
  return (entry && entry.duration) || 0;
};
