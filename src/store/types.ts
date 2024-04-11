import { Reducer, Store } from '@reduxjs/toolkit';

export type FilmNameType = {
  name: string;
  language: string;
  type: string;
};

export type ExternalIdType = {
  kpHD: string;
  imdb: string;
  tmdb: number;
};

export type FilmFactsType = {
  value: string;
  type: string;
  spoiler: boolean;
};

export type FilmRatingType = {
  kp: number;
  imdb: number;
  tmdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
};

export type FilmVotesType = {
  kp: string;
  imdb: number;
  tmdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
};

export type FilmLogoType = {
  url: string;
};

export type FilmPosterType = {
  url: string;
  previewUrl: string;
};

export type FilmBackdropType = {
  url: string;
  previewUrl: string;
};

export type FilmTrailerType = {
  url: string;
  name: string;
  site: string;
  size: number;
  type: string;
};

export type FilmPersonType = {
  id: number;
  photo: string;
  name: string;
  enName: string;
  description: string;
  profession: string;
  enProfession: string;
};

export type ISimilarMovie = {
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
};

export interface IFilm {
  id: number;
  externalId: ExternalIdType;
  name: string;
  alternativeName: string;
  enName: string;
  names: FilmNameType[];
  type: string;
  typeNumber: number;
  year: number;
  description: string;
  shortDescription: string;
  slogan: string;
  status: string;
  facts: FilmFactsType[];
  rating: FilmRatingType;
  votes: FilmVotesType;
  movieLength: number;
  ratingMpaa: string;
  ageRating: number;
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
    count: number;
    positiveCount: number;
    percentage: string;
  };
  seasonsInfo: {
    number: number;
    episodesCount: number;
  }[];
  budget: {
    value: number;
    currency: string;
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

export interface FilmSearchResponse {
  docs: IFilm[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface ActionType {
  type: string;
  payload: FilmSearchResponse;
}

export interface Genre {
  name: string;
  slug: string;
  title: string;
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

export type SeasonsResponse = {
  docs: ISeason[];
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

export type FilterPayload = {
  type: FilterType;
  value: FilterString;
};

export type FilterState = FilterPayload[] | [];

export type FilterType = 'year' | 'countries.name' | 'ageRating';
export type FilterString = Record<FilterType, string> | null;

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
}

export interface RootState {
  films: filmsState;
}

export type setupStore = () => Store;
export type RootReducer = Reducer<RootState>;
export type AppStore = ReturnType<setupStore>;
export type AppDispatch = AppStore['dispatch'];
