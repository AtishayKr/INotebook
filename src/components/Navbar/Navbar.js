import React, { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const {showAlert} = props
  const refer = useRef();

  let location = useLocation();

  let navigate = useNavigate();

  // useEffect(() => {
  //   console.log(location);

  // }, [location]);

  const hadleLogout = () => {
    refer.current.click();
    localStorage.removeItem("token");
    showAlert("Logout Successfully", "success");
    navigate("/login");
  };

  const onClick = () => {
    refer.current.click();
  };

  return (
    <nav className="navbar navbar-light navbar-expand-lg" style={{backgroundColor: "#e3f2fd"}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to={localStorage.getItem("token")?"/addNote": "/login"}> <img src={require('./banner.png')} alt="logo" height={"36"} />
        </Link>

        <button
          ref={refer}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mt-3 me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                onClick={onClick}
                className={`nav-link ${
                  location.pathname === "/addNote" ? "active" : ""
                }`}
                to={localStorage.getItem("token")?"/addNote": "/login"}
              >
                Add Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={onClick}
                className={`nav-link ${
                  location.pathname === "/showNote" ? "active" : ""
                }`}
                to={localStorage.getItem("token")?"/showNote": "/login"}
              >
                Show Notes
              </Link>
            </li>
          </ul>
          {localStorage.getItem("token") ? (
            <button
              type="button"
              onClick={hadleLogout}
              className="btn btn-primary"
            >
              Logout
            </button>
          ) : ""}
        </div>
      </div>
    </nav>
  );
}
