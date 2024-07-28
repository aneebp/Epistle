import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Header = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get("api/user/profile/");
        setUser(res.data);
      } catch (error) {
        console.log("error during the userfetching", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      <header className="header" data-header>
        <div className="container">
          <a href="/" className="logo">
            <h1>Epistle</h1>
          </a>

          <nav className="navbar" data-navbar>
            <div className="navbar-top">
              <a href="#" className="logo">
                <img
                  src="./src/assets/images/logo.svg"
                  width="119"
                  height="37"
                  alt="Wren logo"
                />
              </a>

              <button
                className="nav-close-btn"
                aria-label="close menu"
                data-nav-toggler
              >
                <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
              </button>
            </div>

            <ul className="navbar-list">
              <li>
                <a href="/" className="navbar-link hover-1" data-nav-toggler>
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#topics"
                  className="navbar-link hover-1"
                  data-nav-toggler
                >
                  Topics
                </a>
              </li>

              <li>
                <a
                  href="#featured"
                  className="navbar-link hover-1"
                  data-nav-toggler
                >
                  Latest Post
                </a>
              </li>
              {/* another page to see all the post from the recent date */}
              <li>
                <Link
                  to="/startwriting"
                  className="navbar-link hover-1"
                  data-nav-toggler
                >
                  Start Writing
                </Link>
              </li>

              <li>
                <a href="#" className="navbar-link hover-1" data-nav-toggler>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          {user ? (
            <Link to={`/profile/${user.id}`}>
              <div className="user_profile">
                <img
                  src={
                    user
                      ? user.profile_image
                      : "./src/assets/images/default-profile.png"
                  }
                  alt=""
                />
              </div>
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
