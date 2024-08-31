exports.getCurrentDateTime = () => {
  const currentDate = new Date();

  // Get individual components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is 0-indexed
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format as YYYY-MM-DD HH:MM:SS
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return formattedDate;
};

exports.now = () => {
  return Math.floor(Date.now() / 1000);
};

exports.getCurrentMonthAndYear = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = monthNames[currentDate.getMonth()];

  return month + year;
};

exports.unixTimeToHumanReadableDate = (unixTime) => {
  const date = new Date(unixTime * 1000);
  
   // Extract individual components
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');
   const hours = String(date.getHours()).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0');
   const seconds = String(date.getSeconds()).padStart(2, '0');
 
   // ISO 8601 date-time format
   const readableTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
   return readableTime;
};
