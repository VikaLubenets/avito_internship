export interface filmsState {
  totalCount: number;
  currentPage: number;
  limitPerPage: number;
  totalPages: number;
  search: string;
  filters: FilterState;
  isLoading: boolean;
  error: null | string;
  searchHistory: string[];
  searchSuggestions: string[];
  pageActors: number;
  pageReviews: number;
  pageSeasons: number;
  pagePosters: number;
  randomFilmFilters: RandomFilmFiltersPayload;
}

export type FilterType =
  | 'year'
  | 'countries.name'
  | 'ageRating'
  | 'isSeries'
  | 'rating.kp';
export type FilterString = Record<FilterType, string> | null;
export type FilterPayload = {
  type: FilterType;
  value: FilterString;
};
export type FilterState = FilterPayload[] | [];

export type RandomFilmType = FilterType | 'networks.items.name' | 'genres.name';
export type RandomFilterString = Partial<Record<RandomFilmType, string[]>>;
export type RandomFilmFiltersPayload = RandomFilterString[];

export interface LoginState {
  loginName: string;
  password: string;
  isLoading: boolean;
  error: undefined | string;
}

export interface UserState {
  authData?: User;
}

export type User = {
  username: string;
  password: string;
  id: number;
  age: number;
  lastWatched: IFilm[];
};

export type LoginByUserNameProps = {
  username: string;
  password: string;
};

export interface FilmSearchResponse {
  docs: IFilm[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export type ReviewResponse = {
  docs: IReview[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};

export type IReview = {
  id: number;
  movieId: number;
  title: string;
  type: string;
  review: string;
  date: string;
  author: string;
  userRating: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
};

export type PostersResponse = {
  docs: IPoster[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};

export type IPoster = {
  url: string;
  createdAt: string;
  height: number;
  previewUrl: string;
  type: string;
  updatedAt: string;
  width: number;
  movieId: number;
  id: string;
};

export type SeasonsResponse = {
  docs: ISeason[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};

export interface ISeason {
  movieId: number;
  number: number;
  airDate: string;
  createdAt: string;
  description: string;
  duration: number;
  enDescription: string;
  enName: string;
  episodes: IEpisode[];
  poster: {
    url: string | null;
    previewUrl: string | null;
  };
}

export interface IEpisode {
  number: number;
  name: string;
  enName: string;
  still: {
    url: string;
    previewUrl: string;
  };
  duration: number;
  date: string | null;
  description: string;
  airDate: string | null;
  enDescription: string;
}

export interface IFilm {
  id: number;
  externalId: ExternalIdType;
  name: string | null;
  alternativeName: string | null;
  enName: string | null;
  names: FilmNameType[];
  type: string;
  typeNumber: number;
  year: number | null;
  description: string | null;
  shortDescription: string | null;
  slogan: string | null;
  status: string | null;
  facts: FilmFactsType[];
  rating: FilmRatingType;
  votes: FilmVotesType;
  movieLength: number | null;
  ratingMpaa: string | null;
  ageRating: number | null;
  logo: FilmLogoType;
  poster: FilmPosterType;
  backdrop: FilmBackdropType;
  videos: {
    trailers: FilmTrailerType[];
  };
  genres: {
    name: string;
  }[];
  countries: {
    name: string;
  }[];
  persons: FilmPersonType[];
  reviewInfo: {
    count: number | null;
    positiveCount: number | null;
    percentage: string | null;
  };
  seasonsInfo: {
    number: number | null;
    episodesCount: number | null;
  }[];
  budget: {
    value: number | null;
    currency: string | null;
  };
  fees: {
    world: {
      value: number;
      currency: string;
    };
    russia: {
      value: number;
      currency: string;
    };
    usa: {
      value: number;
      currency: string;
    };
  };
  premiere: {
    country: string;
    world: string;
    russia: string;
    digital: string;
    cinema: string;
    bluray: string;
    dvd: string;
  };
  similarMovies: ISimilarMovie[];
  sequelsAndPrequels: {
    id: number;
    name: string;
    enName: string;
    alternativeName: string;
    type: string;
    poster: {
      url: string;
      previewUrl: string;
    };
    rating: {
      kp: number;
      imdb: number;
      tmdb: number;
      filmCritics: number;
      russianFilmCritics: number;
      await: number;
    };
    year: number;
  }[];
  watchability: {
    items: {
      name: string;
      logo: {
        url: string;
      };
      url: string;
    }[];
  };
  releaseYears: {
    start: number;
    end: number;
  }[];
  top10: number;
  top250: number;
  ticketsOnSale: boolean;
  totalSeriesLength: number;
  seriesLength: number;
  isSeries: boolean;
  audience: {
    count: number;
    country: string;
  }[];
  lists: string[];
  networks: {
    items: {
      name: string;
      logo: {
        url: string;
      };
    }[];
  };
  updatedAt: string;
  createdAt: string;
}

export type FilmNameType = {
  name: string;
  language: string | null;
  type: string | null;
};

export type ExternalIdType = {
  kpHD: string | null;
  imdb: string | null;
  tmdb: number | null;
};

export type FilmFactsType = {
  value: string;
  type: string;
  spoiler: boolean;
};

export type FilmRatingType = {
  kp: number | null;
  imdb: number | null;
  tmdb: number | null;
  filmCritics: number | null;
  russianFilmCritics: number | null;
  await: number | null;
};

export type FilmVotesType = {
  kp: string | null;
  imdb: number | null;
  tmdb: number | null;
  filmCritics: number | null;
  russianFilmCritics: number | null;
  await: number | null;
};

export type FilmLogoType = {
  url: string | null;
};

export type FilmPosterType = {
  url: string | null;
  previewUrl: string | null;
};

export type FilmBackdropType = {
  url: string | null;
  previewUrl: string | null;
};

export type FilmTrailerType = {
  url: string | null;
  name: string | null;
  site: string | null;
  size: number;
  type: string | null;
};

export type FilmPersonType = {
  id: number | null;
  photo: string | null;
  name: string | null;
  enName: string | null;
  description: string;
  profession: string;
  enProfession: string;
};

export type ISimilarMovie = {
  id: number | null;
  name: string;
  enName: string;
  alternativeName: string;
  type: string;
  poster: {
    url: string | null;
    previewUrl: string | null;
  };
  rating: {
    kp: number | null;
    imdb: number | null;
    tmdb: number | null;
    filmCritics: number | null;
    russianFilmCritics: number | null;
    await: number | null;
  };
  year: number;
};

export interface ActionType {
  type: string;
  payload: FilmSearchResponse;
}

export interface Genre {
  name: string;
  slug: string;
  title: string;
}
