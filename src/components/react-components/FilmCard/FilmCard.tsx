import { useParams } from 'react-router-dom';
import {
  useGetPostersQuery,
  useGetReviewsQuery,
  useGetSeasonsQuery,
} from '../../../api/api';
import { useAppSelector } from '../../../store/hooks/redux';
import { IFilm } from '../../../store/types';
import ActorsList from './ActorsList/ActorsList';
import PostersList from './PostersList/PostersList';
import ReviewsList from './ReviewsList/ReviewsList';
import SeasonsList from './SeasonsList/SeasonList';
import SimilarFilms from './SimilarFilms/SimilarFilms';
import './FilmCard.scss';
import FilmInfo from './FilmInfo/FilmInfo';
import Placeholder from '../../ui/Placeholder/placeholder';
import Loader from '../Loader/Loader';

type Props = {
  data: IFilm;
};

const FilmCard = ({ data }: Props) => {
  const {
    name,
    alternativeName,
    description,
    rating,
    persons,
    isSeries,
  } = data;
  const { id } = useParams<{ id: string }>();
  const currentPageReviews = useAppSelector((state) => state.films.pageReviews);
  const { data: filmReviews, isLoading: reviewsLoading } = useGetReviewsQuery({
    page: currentPageReviews,
    movieId: id!,
  });

  const currentPagePosters = useAppSelector((state) => state.films.pagePosters);
  const { data: filmPosters, isLoading: postersLoading } = useGetPostersQuery({
    page: currentPagePosters,
    movieId: id!,
  });

  const currentPageSeasons = useAppSelector((state) => state.films.pageSeasons);
  const { data: filmSeason, isLoading: seasonsLoading } = useGetSeasonsQuery({
    page: currentPageSeasons,
    movieId: id!,
  });

  return (
    <div className="film-card-container">
      <FilmInfo
        name={name ?? alternativeName ?? ''}
        description={description || 'Описание фильма отсутствует'}
        rating={rating}
        poster={data?.poster ?? {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGJY82_orZH-Uhffb4PttFzSq1em-X9ZAE2g&s'}}
        isSeries={isSeries}
      />
      {persons ? (
        <ActorsList actors={persons} />
      ) : (
        <Placeholder message="Нет информации об актерах" />
      )}
      {isSeries && seasonsLoading ? (
        <Loader />
      ) : (
        <>
          {filmSeason ? (
            <SeasonsList seasons={filmSeason} />
          ) : (
            <Placeholder message="Нет информации о сезонах" />
          )}
        </>
      )}
      {reviewsLoading ? (
        <Loader />
      ) : (
        <>
          {(filmReviews && filmReviews.total > 0) ? (
            <ReviewsList reviews={filmReviews} />
          ) : (
            <Placeholder message="Нет отзывов" />
          )}
        </>
      )}
      {postersLoading ? (
        <Loader />
      ) : (
        <>
          {filmPosters && filmPosters.total > 0 ? (
            <PostersList posters={filmPosters} />
          ) : (
            <Placeholder message="Нет постеров" />
          )}
        </>
      )}
      {data.similarMovies && data.similarMovies?.length > 0 ? (
        <SimilarFilms similarMovies={data.similarMovies} />
      ) : (
        <Placeholder message="Нет похожих фильмов" />
      )}
    </div>
  );
};

export default FilmCard;
