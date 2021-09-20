const doubleDigits = (num) => {
  if (num < 10) return `0${num}`;
  return num;
};

/**
 * @param {Date} date  Date object
 * @returns string representation of date that conforms to API format
 */
const formatDate = (date) => `${date.getFullYear()}-${doubleDigits(date.getMonth() + 1)}-${doubleDigits(date.getDate())}`;

export const COLORS = {
  primary: '#62b5e5',
  gray: '#67899c',
  red: '#9e0606',
};

export const dates = {
  /**
   * @returns string resentation of today that conforms to API format
   */
  today: () => formatDate(new Date()),
  format: formatDate,
  timeStringClock: (time) => {
    let rem = time;
    const hrs = Math.floor(rem / 3600);
    rem -= 3600 * hrs;
    const mins = Math.floor(rem / 60);
    const secs = Math.floor(rem - (60 * mins));
    return `${doubleDigits(hrs)} : ${doubleDigits(mins)} : ${doubleDigits(secs)}`;
  },
  timeString: (time) => {
    let rem = time;
    const hrs = Math.floor(rem / 3600);
    rem -= 3600 * hrs;
    const mins = Math.floor(rem / 60);
    const secs = Math.floor(rem - (60 * mins));
    const ch = hrs === 1 ? 'hr' : 'hrs';
    const cm = mins === 1 ? 'min' : 'mins';
    const cs = secs === 1 ? 'sec' : 'secs';
    return `${hrs}${ch} ${mins}${cm} ${secs}${cs}`;
  },
  toDate: (str) => {
    const parts = str.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);
  },
};

export const taskDuration = (task, date) => {
  const entry = task.entries.find((entry) => entry.entry_date === date);
  return (entry && entry.duration) || 0;
};
