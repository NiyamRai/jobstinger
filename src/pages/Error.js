import { Link } from "react-router-dom";
import errorimage from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";
const Error = () => {
  return (
    <Wrapper>
      <div>
        <img src={errorimage} alt="" />
        <h2>Page not found</h2>
        <p>Something went wrong</p>
        <Link to="/">Go Back</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
