export function formatDate(date?: string): string | undefined {
  if (date) {
    const dateObject = new Date(date);
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${day} ${month} ${year}`;
  }

  return undefined;
}
