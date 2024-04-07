import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { filmsSlice } from '../../../store/reducers/filmsReducer';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.films.currentPage);
  const totalPages = useAppSelector((state) => state.films.totalPages);

  const handlePageClick = (pageNumber: number) => {
    dispatch(filmsSlice.actions.setCurrentPage(pageNumber));
  };

  const renderPaginationItems = () => {
    const items = [];

    items.push(
      <Pagination.First
        key="first"
        onClick={() => handlePageClick(1)}
      />
    );
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    }

    if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
    }

    if (startPage > 1) {
      items.push(
        <Pagination.Ellipsis key="leftEllipsis" />
      );
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      items.push(
        <Pagination.Ellipsis key="rightEllipsis" />
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    items.push(
      <Pagination.Last
        key="last"
        onClick={() => handlePageClick(totalPages)}
      />
    );

    return items;
  };

  return (
    <Pagination size="lg" className='pagination'>
      {renderPaginationItems()}
    </Pagination>
  );
};

export default CustomPagination;