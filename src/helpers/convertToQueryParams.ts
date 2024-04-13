import { RandomFilmFiltersPayload } from "../store/types";

export function convertToQueryParams(filters: RandomFilmFiltersPayload): Record<string, string[]> {
  const queryParams: Record<string, string[]> = {};

  filters.forEach((filter: RandomFilmFiltersPayload[number]) => {
      for (const [key, values] of Object.entries(filter)) {
          if (Array.isArray(values)) {
            queryParams[key] = values;
          }
      }
  });

  return queryParams;
}