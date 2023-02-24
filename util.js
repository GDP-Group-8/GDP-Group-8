import { DAYS_IN_A_WEEK, DAY_IN_MILLISECONDS } from "./constants";

export const getDay = (dateObj = new Date()) =>
  [6, 0, 1, 2, 3, 4, 5][dateObj.getDay()];

export const getThisWeekDates = (dateObj) => {
  const currDay = getDay();
  const dates = [];
  for (let i = 0; i < DAYS_IN_A_WEEK; i++) {
    const n = i - currDay;
    dates.push(new Date(+dateObj + n * DAY_IN_MILLISECONDS).getDate());
  }
  return dates;
};

export const times = (n, cbOrLiteral) => {
  const [callback, literal] = [cbOrLiteral, cbOrLiteral];
  return typeof cbOrLiteral === "function"
    ? [...new Array(n).keys()].map(callback)
    : [...new Array(n).keys()].map(() => literal);
};

export const getDDMMYYYY = (dateObj) => {
  return dateObj
    .toISOString() // convert to ISO string
    .split("T")[0] // split at T and take first part
    .split("-") // split at - and convert to array
    .reverse() // reverse array
    .join("-"); // join array with -
};

export const getRandomColor = (isRandom = true) => {
  if (!isRandom) return "#000000";
  const letters = "0123456789ABCDEF";
  return "#" + times(6, () => letters[Math.floor(Math.random() * 16)]).join("");
};
