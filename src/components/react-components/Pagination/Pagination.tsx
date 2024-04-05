import './Pagination.scss';
export default function Pagination() {
  const pageNumbers = [1, 2, 3, 4]; // change for real page numbers after api request
  const currentPage = 1;
  const handlePageClick = (num: number) => {
    console.log(num);
  }

  return (
    <div className="pagination" data-testid="pagination">
      {pageNumbers.map((number) => (
        <div
          className={`pagination-item ${
            currentPage === number ? 'current' : ''
          }`}
          key={number}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </div>
      ))}
    </div>
  );
}