const doubleDigits = (num) => {
  if (num < 10) return `0${num}`;
  return num;
};

/**
 * @param {Date} date  Date object
 * @returns string representation of date that conforms to API format
 */
const formatDate = (date) => `${date.getFullYear()}-${doubleDigits(date.getMonth() + 1)}-${doubleDigits(date.getDate())}`;

/**
 * @returns string resentation of today that conforms to API format
 */
export const today = () => formatDate(new Date());

export const format = formatDate;

export const timeStringClock = (time) => {
  let rem = time;
  const hrs = Math.floor(rem / 3600);
  rem -= 3600 * hrs;
  const mins = Math.floor(rem / 60);
  const secs = Math.floor(rem - (60 * mins));
  return `${doubleDigits(hrs)} : ${doubleDigits(mins)} : ${doubleDigits(secs)}`;
};

export const timeString = (time) => {
  let rem = time;
  const hrs = Math.floor(rem / 3600);
  rem -= 3600 * hrs;
  const mins = Math.floor(rem / 60);
  const secs = Math.floor(rem - (60 * mins));
  const ch = hrs === 1 ? 'hr' : 'hrs';
  const cm = mins === 1 ? 'min' : 'mins';
  const cs = secs === 1 ? 'sec' : 'secs';
  return `${hrs}${ch} ${mins}${cm} ${secs}${cs}`;
};

export const toDate = (str) => {
  const parts = str.split('-');
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

/**
* Gets the date of {@num} number of days ago
* @param {*} num number of days in the past
* @returns string resentation of day that conforms to API format
*/
export const daysAgo = (num) => {
  const date = new Date();
  return formatDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - num));
};

export const formattedDate = () => {
  const today = new Date();
  return today.toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );
};
