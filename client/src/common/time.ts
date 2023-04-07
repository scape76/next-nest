export const getTimeAgo = (date: string): string => {
  const now = new Date();
  const difference = Number(now) - Number(new Date(date));

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;

  if (difference < minute) {
    const secondsAgo = Math.floor(difference / second);
    return `${secondsAgo}s`;
  } else if (difference < hour) {
    const minutesAgo = Math.floor(difference / minute);
    const secondsAgo = Math.floor((difference - (minutesAgo * minute)) / second);
    return `${minutesAgo}m ${secondsAgo}s`;
  } else if (difference < day) {
    const hoursAgo = Math.floor(difference / hour);
    const minutesAgo = Math.floor((difference - (hoursAgo * hour)) / minute);
    return `${hoursAgo}h ${minutesAgo}m`;
  } else if (difference < month) {
    const daysAgo = Math.floor(difference / day);
    const hoursAgo = Math.floor((difference - (daysAgo * day)) / hour);
    return `${daysAgo}d ${hoursAgo}h`;
  } else {
    const monthsAgo = Math.floor(difference / month);
    const daysAgo = Math.floor((difference - (monthsAgo * month)) / day);
    return `${monthsAgo}m ${daysAgo}d`;
  }
};
