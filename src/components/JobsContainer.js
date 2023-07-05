import { useEffect } from "react";
import Job from "./Job";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import { getallJobs } from "../features/allJobs/allJobsSlice";
import { useSelector, useDispatch } from "react-redux";
const JobsContainer = () => {
  const { jobs, isloading } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallJobs());
  }, []);

  if (isloading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    );
  } else if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
