import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {
  const { numberOfpages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) newPage = numberOfpages;
    dispatch(changePage(newPage));
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numberOfpages) newPage = 1;
    dispatch(changePage(newPage));
  };
  const pages = Array.from({ length: numberOfpages }, (_, index) => {
    return index + 1;
  });
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              key={pageNumber}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
