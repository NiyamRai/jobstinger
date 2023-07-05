import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../components";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
const initialstate = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setvalues] = useState(initialstate);
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setvalues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    console.log(user);
    e.preventDefault();
    if (
      !values.email ||
      !values.password ||
      (!values.isMember && !values.name)
    ) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    if (values.isMember) {
      dispatch(loginUser({ email: values.email, password: values.password }));

      return;
    }
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
  };

  const toggleMember = () => {
    setvalues({ ...values, isMember: !values.isMember });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* <h3>NAme</h3> */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            lableText="NAME"
          />
        )}
        {/* <h3>Email</h3> */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          lableText="EMAIL"
        />
        {/* <h3>password</h3> */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          lableText="PASSWORD"
        />
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}

          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {" "}
          {values.isMember ? "Login" : "Register"}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            );
          }}
        >
          {isLoading ? "loading..." : "demo"}
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
