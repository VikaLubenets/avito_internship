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

type Props = {
  data: IFilm;
};

const FilmCard = ({ data }: Props) => {
  const { name, description, rating, persons, poster, isSeries, similarMovies } = data;
  const { id } = useParams<{ id: string }>();
  const currentPageReviews = useAppSelector((state) => state.films.pageReviews);
  const { data: filmReviews, isLoading } = useGetReviewsQuery({
    page: currentPageReviews,
    movieId: id!,
  });

  const currentPagePosters = useAppSelector((state) => state.films.pagePosters);
  const { data: filmPosters } = useGetPostersQuery({
    page: currentPagePosters,
    movieId: id!,
  });

  const currentPageSeasons = useAppSelector((state) => state.films.pageSeasons);
  const { data: filmSeason } = useGetSeasonsQuery({
    page: currentPageSeasons,
    movieId: id!,
  });

  return (
    <div className="film-card-container">
      <FilmInfo 
        name={name} 
        description={description} 
        rating={rating} 
        poster={poster} 
        isSeries={isSeries} 
      />
      {persons ? <ActorsList actors={persons} /> : <Placeholder message="Нет информации об актерах" />}
      {filmReviews ? <ReviewsList reviews={filmReviews} /> : <Placeholder message="Нет отзывов" />}
      {filmPosters ? <PostersList posters={filmPosters} /> : <Placeholder message="Нет постеров" />}
      {similarMovies.length > 0 ? <SimilarFilms similarMovies={similarMovies}/> : <Placeholder message="Нет похожих фильмов" />}
      {isSeries && filmSeason ? <SeasonsList seasons={filmSeason} /> : <Placeholder message="Нет информации о сезонах" />}
    </div>
  );
};

export default FilmCard;
