//#D2665A
const Pagination = ({
    currentPage = 0,
    pageSize = 5,
    nextPage,
    previousPage,
    totalItems = 0,
    setCurrentPage,
}: {
    currentPage: number | undefined;
    pageSize: number | undefined;
    nextPage: number | null | undefined;
    previousPage: number | null | undefined;
    totalItems: number | undefined;
    setCurrentPage: (page: number) => void;
}) => {

    const totalPages = Math.ceil(totalItems / pageSize);

    const handleNext = () => {
        if (nextPage !== null && nextPage !== undefined) {
            setCurrentPage(nextPage);
        }
    };

    const handlePrevious = () => {
        if (previousPage !== null && previousPage !== undefined) {
            setCurrentPage(previousPage);
        }
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="pagination">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
            >
                <p>Previous</p>
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageClick(index)}
                    disabled={index === currentPage}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={currentPage >= totalPages - 1}
            >
               <p>Next</p>
            </button>
        </div>
    );
};

export default Pagination;
