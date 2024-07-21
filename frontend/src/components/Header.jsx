import React from "react";

const Header = () => {
  return (
    <>
      <header className="header" data-header>
        <div className="container">
          <a href="/home" className="logo">
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
                <a
                  href="/home"
                  className="navbar-link hover-1"
                  data-nav-toggler
                >
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
                <a
                  href="#tags"
                  className="navbar-link hover-1"
                  data-nav-toggler
                >
                  Start Writing
                </a>
              </li>

              {/* <li>
                <a href="#" className="navbar-link hover-1" data-nav-toggler>
                  Contact
                </a>
              </li> */}
            </ul>

            <div className="navbar-bottom">
              <div className="profile-card">
                <img
                  src="./src/assets/images/author-1.png"
                  width="48"
                  height="48"
                  alt="Steven"
                  className="profile-banner"
                />

                <div>
                  <p className="card-title">Hello Steven !</p>

                  <p className="card-subtitle">You have 3 new messages</p>
                </div>
              </div>

              <ul className="link-list">
                <li>
                  <a href="#" className="navbar-bottom-link hover-1">
                    Profile
                  </a>
                </li>

                <li>
                  <a href="#" className="navbar-bottom-link hover-1">
                    Articles Saved
                  </a>
                </li>

                <li>
                  <a href="#" className="navbar-bottom-link hover-1">
                    Add New Post
                  </a>
                </li>

                <li>
                  <a href="#" className="navbar-bottom-link hover-1">
                    My Likes
                  </a>
                </li>

                <li>
                  <a href="#" className="navbar-bottom-link hover-1">
                    Account Setting
                  </a>
                </li>

                <li>
                  <a href="#" className="navbar-bottom-link hover-1">
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {/* ////// If user does not login////// */}
          {/* <a href="#" className="btn btn-primary">
            Login
          </a> */}
          {/* ///////If user is login */}
          <div className="user_profile">
            <img src="./src/assets/images/author-1.png" alt="" />
          </div>

          <buttonx
            className="nav-open-btn"
            aria-label="open menu"
            data-nav-toggler
          >
            <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
          </buttonx>
        </div>
      </header>
    </>
  );
};

export default Header;
