export function formatDate(dateString: string) {
  const formattedDate = new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formattedDate;
}
