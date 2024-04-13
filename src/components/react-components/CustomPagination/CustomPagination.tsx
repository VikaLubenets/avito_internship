import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { filmsSlice } from '../../../store/reducers/filmsReducer';
import Pagination from 'react-bootstrap/Pagination';
import { useCallback, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  totalPages: number;
};
const CustomPagination = memo(({ totalPages }: Props) => {
  const { innerWidth: width } = window;
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = useAppSelector((state) => state.films.currentPage);

  const renderPaginationItems = useRenderPaginationItems({
    currentPage,
    totalPages,
    onPageClick: (page: number) => {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        page: String(page),
      }));
      dispatch(filmsSlice.actions.setCurrentPage(page));
    },
  });

  return (
    <Pagination size={width > 750 ? 'lg' : 'sm'} className="pagination">
      {renderPaginationItems()}
    </Pagination>
  );
});

export default CustomPagination;

type RenderPaginationItemsProps = {
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
};

export const useRenderPaginationItems = ({
  currentPage,
  totalPages,
  onPageClick,
}: RenderPaginationItemsProps) => {
  const renderPaginationItems = useCallback(() => {
    const items = [];

    items.push(<Pagination.First key="first" onClick={() => onPageClick(1)} />);
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => onPageClick(currentPage - 1)}
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
      items.push(<Pagination.Ellipsis key="leftEllipsis" />);
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => onPageClick(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      items.push(<Pagination.Ellipsis key="rightEllipsis" />);
    }

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => onPageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    items.push(
      <Pagination.Last key="last" onClick={() => onPageClick(totalPages)} />
    );

    return items;
  }, [currentPage, totalPages, onPageClick]);

  return renderPaginationItems;
};
