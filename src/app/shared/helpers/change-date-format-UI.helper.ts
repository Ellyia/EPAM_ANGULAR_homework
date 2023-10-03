export const dateFormatUI = (date: string): string => {
  const dateUI = new Date(date || '');

  const d = dateUI.getDate();
  const dd = d < 10 ? '0' + d : d;

  const m = dateUI.getMonth() + 1;
  const mm = m < 10 ? '0' + m : m;

  const yyyy = dateUI.getFullYear();

  return dd + '/' + mm + '/' + yyyy;
};
