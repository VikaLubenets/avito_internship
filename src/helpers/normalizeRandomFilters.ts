export function normalizeRandomFilmFilters(randomFilmFilters: Array<{ [key: string]: string[] }>): { [key: string]: string } {
  const params: { [key: string]: string } = {};

  randomFilmFilters.forEach((filter: { [key: string]: string[] }) => {
    const [key, values]: [string, string[]] = Object.entries(filter)[0];
    if (values.length > 0) {
      params[key] = values.join(',');
    }
  });

  return params;
}