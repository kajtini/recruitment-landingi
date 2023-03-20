interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const PaginationControl = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}: PaginationControlProps) => {
  return (
    <div className="mb-10 flex items-center justify-end gap-3">
      <span className="text-lg">
        {currentPage}/{totalPages}
      </span>
      <div className="flex gap-3 max-w-xs w-full">
        <button
          className="border-active border-solid border-[1px]  py-1 rounded-full w-full disabled:opacity-70"
          onClick={handlePreviousPage}
          disabled={currentPage === 1 ? true : false}
        >
          Previous Page
        </button>
        <button
          className="bg-active py-1 rounded-full w-full disabled:opacity-70"
          onClick={handleNextPage}
          disabled={currentPage === totalPages ? true : false}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PaginationControl;
