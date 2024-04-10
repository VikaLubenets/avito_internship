import Pagination from 'react-bootstrap/Pagination';
import { formatDate } from '../../../../helpers/formatData';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import { filmsSlice } from '../../../../store/reducers/filmsReducer';
import type { ReviewResponse } from '../../../../store/types';
import { DEFAULT_REVIEWS_PER_PAGE } from '../../../../utils/constants';
import { useRenderPaginationItems } from '../../CustomPagination/CustomPagination';
import './ReviewsList.scss';

interface Props {
  reviews: ReviewResponse;
}

const ReviewsList = ({ reviews }: Props) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.films.pageReviews);

  const renderPaginationItems = useRenderPaginationItems({
    currentPage: currentPage,
    totalPages: Math.ceil(reviews.total / DEFAULT_REVIEWS_PER_PAGE),
    onPageClick: (page: number) => {
      dispatch(filmsSlice.actions.setPageReviews(page));
    },
  });

  return (
    <div className='review-container'>
      <h2>Отзывы</h2>
      {reviews.docs.map((review) => (
        <div key={review.id} className="review-item">
          <h3>{review.author}</h3>
          <p>Оценка: {review.userRating}</p>
          <p>Дата: {formatDate(review.date)}</p>
          <p>{review.review}</p>
        </div>
      ))}
      <Pagination size="sm" className="pagination">
        {renderPaginationItems()}
      </Pagination>
    </div>
  );
};

export default ReviewsList;
