const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", {
    month: "short",
  });
};

const getDayName = (dateStr) => {
  // 'mm/dd/yy'
  const date = new Date(dateStr);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
  });
};

const getTime = (time) => {
  const timeFromData = time.split("T");

  return timeFromData[1].substring(0, 5);
};

const getDate = (episodeReleaseDate) => {
  //releaseDate: "2023-04-12T05:00:00Z"
  const episodeDate = new Date(episodeReleaseDate);

  const date2 = new Date();
  const difference = date2.getTime() - episodeDate.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));

  const currentDayOfMonth = episodeDate.getDate();
  const currentMonth = episodeDate.getMonth(); //January is 0, not 1
  const currentYear = episodeDate.getFullYear();

  let date = currentDayOfMonth + "/" + getMonthName(currentMonth + 1);

  //02/27/2023
  const dateMMDDYY =
    currentMonth + 1 + "/" + currentDayOfMonth + "/" + currentYear;

  const day = getDayName(dateMMDDYY);

  if (currentYear !== 2023) {
    date = currentDayOfMonth + "/" + (currentMonth + 1) + "/" + currentYear;
    return date;
  } else if (7 > days) {
    date = `last ${day}`;
    return date;
  }

  return date;
};

export { getDate, getTime };
