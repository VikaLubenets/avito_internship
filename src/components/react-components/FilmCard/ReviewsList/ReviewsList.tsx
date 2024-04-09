import { useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/redux";
import { filmsSlice } from "../../../../store/reducers/filmsReducer";
import type { ReviewResponse } from '../../../../store/types';
import { DEFAULT_REVIEWS_PER_PAGE } from "../../../../utils/constants";
import { useRenderPaginationItems } from "../../Pagination/Pagination";
import './ReviewsList.scss';

interface Props {
  reviews: ReviewResponse;
}

const ReviewsList = ({ reviews }: Props) => {
  const itemsPerPage = DEFAULT_REVIEWS_PER_PAGE;

  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.films.pageReviews);

  const renderPaginationItems = useRenderPaginationItems({
    currentPage: currentPage,
    totalPages: Math.ceil(reviews.total / itemsPerPage),
    onPageClick: (page: number) => {
      dispatch(filmsSlice.actions.setPageReviews(page));
    },
  });

  return (
    <div>
      {reviews.docs.map((review, index) => (
        <div key={index} className="review-item">
          <h3>{review.author}</h3>
          <p>Rating: {review.userRating}</p>
          <p>Date: {review.date}</p>
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