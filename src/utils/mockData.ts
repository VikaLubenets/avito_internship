import { FilmSearchResponse, PostersResponse, ReviewResponse, SeasonsResponse, User } from "../store/types";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
  })),
});

export const mockFilmsData: FilmSearchResponse = {
  docs: [
        {
          id: 1,
          externalId: {
            kpHD: '1234HD',
            imdb: 'tt1234567',
            tmdb: 1234567,
          },
          name: 'Film 1',
          alternativeName: 'Фильм 1',
          enName: 'Film 1',
          names: [
            {
              name: 'Film 1',
              language: 'en',
              type: 'original',
            },
            {
              name: 'Фильм 1',
              language: 'ru',
              type: 'translated',
            },
          ],
          type: 'movie',
          typeNumber: 1,
          year: 2022,
          description: 'This is the description of Film 1.',
          shortDescription: 'Short description of Film 1.',
          slogan: 'Film 1 slogan',
          status: 'released',
          facts: [
            {
              value: 'Fact 1 about Film 1.',
              type: 'general',
              spoiler: false,
            },
            {
              value: 'Fact 2 about Film 1.',
              type: 'general',
              spoiler: false,
            },
          ],
          rating: {
            kp: 7.5,
            imdb: 7.0,
            tmdb: 7.0,
            filmCritics: 7.5,
            russianFilmCritics: 7.0,
            await: 7.0,
          },
          votes: {
            kp: '1000',
            imdb: 2000,
            tmdb: 1500,
            filmCritics: 50,
            russianFilmCritics: 30,
            await: 40,
          },
          movieLength: 120,
          ratingMpaa: 'PG-13',
          ageRating: 13,
          logo: {
            url: 'https://example.com/film1/logo.jpg',
          },
          poster: {
            url: 'https://example.com/film1/poster.jpg',
            previewUrl: 'https://example.com/film1/poster-preview.jpg',
          },
          backdrop: {
            url: 'https://example.com/film1/backdrop.jpg',
            previewUrl: 'https://example.com/film1/backdrop-preview.jpg',
          },
          videos: {
            trailers: [
              {
                url: 'https://example.com/film1/trailer1.mp4',
                name: 'Trailer 1',
                site: 'YouTube',
                size: 720,
                type: 'trailer',
              },
            ],
          },
          genres: [
            {
              name: 'Drama',
            },
          ],
          countries: [
            {
              name: 'USA',
            },
          ],
          persons: [
            {
              id: 1,
              photo: 'https://example.com/person1.jpg',
              name: 'Actor 1',
              enName: 'Actor 1',
              description: 'An actor in Film 1.',
              profession: 'actor',
              enProfession: 'actor',
            },
          ],
          reviewInfo: {
            count: 100,
            positiveCount: 70,
            percentage: '70%',
          },
          seasonsInfo: [],
          budget: {
            value: 10000000,
            currency: 'USD',
          },
          fees: {
            world: {
              value: 5000000,
              currency: 'USD',
            },
            russia: {
              value: 2000000,
              currency: 'RUB',
            },
            usa: {
              value: 3000000,
              currency: 'USD',
            },
          },
          premiere: {
            country: '2022-01-01',
            world: '2022-01-01',
            russia: '2022-01-02',
            digital: '2022-01-10',
            cinema: '2022-01-05',
            bluray: '2022-02-01',
            dvd: '2022-02-01',
          },
          similarMovies: [],
          sequelsAndPrequels: [],
          watchability: {
            items: [
              {
                name: 'Platform 1',
                logo: {
                  url: 'https://example.com/platform1/logo.jpg',
                },
                url: 'https://example.com/platform1/watch/film1',
              },
            ],
          },
          releaseYears: [],
          top10: 5,
          top250: 100,
          ticketsOnSale: true,
          totalSeriesLength: 0,
          seriesLength: 0,
          isSeries: false,
          audience: [],
          lists: [],
          networks: {
            items: [{
                name: 'string',
                logo: {
                    url: 'string',
                },
            }]
        },
          updatedAt: '2022-04-12T00:00:00Z',
          createdAt: '2022-01-01T00:00:00Z',
        },
  ],
  total: 50,
  limit: 10,
  page: 1,
  pages: 5,
};

export const mockAuthData: User = {
  username: 'testuser',
  password: 'password123',
  id: 1,
  age: 25,
  lastWatched: [],
};

export const mockLoginDataInitial = {
  loginName: '',
  password: '',
  isLoading: false,
  error: undefined,
}

export const mockUserDataInitial = {
  authData: undefined,
}

export const mockInitialState = {
  films: {
    totalCount: 10,
    currentPage: 1,
    limitPerPage: 10,
    totalPages: 1,
    search: '',
    filters: [],
    isLoading: false,
    error: null,
    searchHistory: [],
    searchSuggestions: [],
    pageActors: 1,
    pageReviews: 1,
    pageSeasons: 1,
    pagePosters: 1,
    randomFilmFilters: [],
  },
  user: mockUserDataInitial,
  login: mockLoginDataInitial,
  api: {},
};

export const mockFilmSearchResponse: FilmSearchResponse = {
  docs: mockFilmsData.docs,
  total: 2,
  limit: 10,
  page: 1,
  pages: 1,
};

export const mockReviewResponse: ReviewResponse = {
  docs: [
    {
      id: 1,
      movieId: 1,
      title: 'Review 1',
      type: 'positive',
      review: 'This is a review for test film 1.',
      date: '2023-01-01',
      author: 'Author 1',
      userRating: 5,
      authorId: 1,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    },
  ],
  total: 1,
  limit: 10,
  page: 1,
  pages: 1,
};

export const mockPostersResponse: PostersResponse = {
  docs: [
    {
      url: 'https://example.com/poster1.jpg',
      createdAt: '2023-01-01T00:00:00Z',
      height: 1000,
      previewUrl: 'https://example.com/preview1.jpg',
      type: 'poster',
      updatedAt: '2023-01-01T00:00:00Z',
      width: 800,
      movieId: 1,
      id: '1',
    },
  ],
  total: 1,
  limit: 10,
  page: 1,
  pages: 1,
};

export const mockSeasonsResponse: SeasonsResponse = {
  docs: [
    {
      movieId: 1,
      number: 1,
      airDate: '2023-01-01',
      createdAt: '2023-01-01T00:00:00Z',
      description: 'Season 1 description',
      duration: 60,
      enDescription: 'Season 1 en description',
      enName: 'Season 1 en name',
      episodes: [
        {
          number: 1,
          name: 'Episode 1',
          enName: 'Episode 1 en',
          still: {
            url: 'https://example.com/still1.jpg',
            previewUrl: 'https://example.com/preview_still1.jpg',
          },
          duration: 60,
          date: '2023-01-01',
          description: 'Episode 1 description',
          airDate: '2023-01-01',
          enDescription: 'Episode 1 en description',
        },
      ],
      poster: {
        url: 'https://example.com/poster_season1.jpg',
        previewUrl: 'https://example.com/preview_poster_season1.jpg',
      },
    },
  ],
  total: 1,
  limit: 10,
  page: 1,
  pages: 1,
};

export const userMockData = {
  "users": [
    {
      "username": "admin",
      "password": "password",
      "id": 1,
      "age": 30,
      "lastWatched": []
    },
  ]
}