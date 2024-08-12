import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import MainPage from './MainPage';
import '../../utils/mockData';
import {
  mockInitialState,
  mockFilmsData,
  mockAuthData,
  userMockData,
} from '../../utils/mockData';
import { filmsSlice } from '../../store/reducers/filmsReducer';

const mockStore = configureStore();
const store = mockStore(mockInitialState);
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('@reduxjs/toolkit/query/react', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query/react'),
  fetchBaseQuery: jest.fn(),
}));

jest.mock('../../api/api', () => ({
  ...jest.requireActual('../../api/api'),

  useGetFilmDataByIdQuery: jest.fn((id) => ({
    data: {
      id: id,
      title: 'Test Film',
      description: 'This is a test film description.',
    },
    isLoading: false,
    error: null,
  })),

  useGetAllFilmsAndSeriesQuery: jest.fn((params) => ({
    data: mockFilmsData,
    isLoading: false,
    error: null,
  })),

  useGetSearchFilmsQuery: jest.fn((params) => ({
    data: {
      docs: [],
      total: 0,
      pages: 0,
    },
    isLoading: false,
    error: null,
  })),
}));

test('Click on pagination page updates URL query parameter when page changes', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );
  });
  expect(window.location.search).toBe('?page=1&limit=10');
  fireEvent.click(screen.getByText('2'));

  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledWith(
      filmsSlice.actions.setCurrentPage(2)
    );
    expect(window.location.search).toBe('?page=1&limit=10');
  });
});
