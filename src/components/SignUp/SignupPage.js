import React from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner.png";

export default function SignupPage2(props) {
  const { handleSubmit, onChange, signupData } = props;
  return (
    <>
    
      <section className="text-center">

        {/* <!-- Background image --> */}
        <div
          className="p-5 bg-image"
          style={{
            backgroundImage: `url(${Banner})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "200px",
          }}
        ></div>
        {/* <!-- Background image --> */}
        

        <div
          className="card mx-4 mx-md-5 shadow-5-strong"
          style={{
            marginTop: "-50px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
          }}
        >
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form onSubmit={handleSubmit}>

                  {/* <!-- Name input --> */}
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      placeholder="Your Name"
                      required
                      onChange={onChange}
                      value={signupData.name}
                      autoComplete="off"
                    />
                      
                    </div>
                  </div>
                  

                  {/* <!-- Email input --> */}
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      name="email"
                      placeholder="Your Email Address"
                      required
                      onChange={onChange}
                      value={signupData.email}
                      autoComplete="off"
                    />
                      
                    </div>
                  </div>
                  

                  {/* <!-- Password input --> */}
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      required
                      minLength={7}
                      onChange={onChange}
                      value={signupData.password}
                      autoComplete="off"
                    />
                      
                    </div>
                  </div>
                 

                  {/* <!-- cnfPassword input --> */}
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <input
                      type="password"
                      id="cnfPassword"
                      className="form-control"
                      name="cnfPassword"
                      placeholder="Confirm Your Password"
                      required
                      minLength={7}
                      onChange={onChange}
                      value={signupData.cnfPassword}
                      autoComplete="off"
                    />
                    </div>
                  </div>

                  {/* <!-- Submit button --> */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign up
                  </button>

                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already a member?{" "}
                    <Link to="/login" className="link-danger">
                      Log In
                    </Link>
                  </p>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
