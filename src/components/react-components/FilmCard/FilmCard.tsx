import Pagination from 'react-bootstrap/Pagination';
import { useParams } from 'react-router-dom';
import { useGetPostersQuery, useGetReviewsQuery, useGetSeasonsQuery } from '../../../api/api';
import { useAppSelector } from '../../../store/hooks/redux';
import { IFilm } from "../../../store/types";
import ActorsList from './ActorsList/ActorsList';
import './FilmCard.scss';
import PostersList from './PostersList/PostersList';
import ReviewsList from './ReviewsList/ReviewsList';
import SeasonsList from './SeasonsList/SeasonList';

type Props = {
  data: IFilm,
}

const FilmCard = ({
  data
}: Props) => {
  const { 
    name, 
    description, 
    rating, 
    persons, 
    poster,
    isSeries
  } = data;
  const { id } = useParams<{ id: string }>();
  const currentPageReviews = useAppSelector((state) => state.films.pageReviews);
  const {data: filmReviews, isLoading} = useGetReviewsQuery({
    page: currentPageReviews,
    movieId: id!,
  });

  const currentPagePosters = useAppSelector((state) => state.films.pagePosters);
  const {data: filmPosters} = useGetPostersQuery({
    page: currentPagePosters,
    movieId: id!,
  })

  const currentPageSeasons = useAppSelector((state) => state.films.pageSeasons);
  const {data: filmSeason} = useGetSeasonsQuery({
    page: currentPageSeasons,
    movieId: id!,
  })

  return (
    <div className="film-card-container">
      <div className="first-row-film-container">
          {poster && <img src={poster.url} alt={name} className="film-image"/>}
          <div className="text-container">        
            <h1>{isSeries ? 'Сериал ' : 'Фильм '}{`"${name}"`}</h1>
            <p>
              {description}
            </p>
            <p>Рейтинг Кинопоиска: {rating.kp}</p>
          </div>
      </div>
      <h2>Actors:</h2>
      <ActorsList actors={persons} />
      <h3 className='sub-title'>User Reviews:</h3>
      {filmReviews && <ReviewsList reviews={filmReviews} />}
      {filmPosters && <PostersList posters={filmPosters} />}
      {isSeries && filmSeason && (
        <div>
          <h3 className='sub-title'>Seasons:</h3>
          <SeasonsList seasons={filmSeason} />
        </div>
      )}
    </div>
  );
};

export default FilmCard;
