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
  similarMovies: {
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

export type FilterString = 'year' | 'country' | 'ageRating' | '';

export interface filmsState {
  films: IFilm[];
  totalCount: number;
  currentPage: number;
  limitPerPage: number;
  totalPages: number;
  search: string;
  year: string;
  country: string;
  ageRating: string;
  filter: FilterString;
  isLoading: boolean;
  error: null | string;
}

export interface RootState {
  films: filmsState;
}

export type setupStore = () => Store;
export type RootReducer = Reducer<RootState>;
export type AppStore = ReturnType<setupStore>;
export type AppDispatch = AppStore['dispatch'];
