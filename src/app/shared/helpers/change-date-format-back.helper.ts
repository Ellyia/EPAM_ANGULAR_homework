export const dateFormatBack = (date: string): string => {
  const dateParts = date?.split('/');
  if (dateParts?.length !== 3) return date;

  const months = [
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
    'December'
  ];

  const day = dateParts[0];
  const monthIndex = parseInt(dateParts[1]) - 1;
  const year = dateParts[2];

  if (monthIndex < 0 || monthIndex >= months.length) return date;

  return `${months[monthIndex]} ${day} ${year}`;
};
