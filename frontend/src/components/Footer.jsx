import React from "react";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="card footer">
            <div className="ssection footer-top">
              <div className="footer-brand">
                <a href="#" className="logo">
                  <h1>Epistle</h1>
                </a>

                <p className="footer-text">
                  Discover the most talked-about topics in our blogosphere.
                  Whether it's current events, innovative ideas, or viral
                  trends, our Hot Topics section keeps you updated and engaged.
                </p>
              </div>
              <div className="footer-list">
                <p className="footer-list-title">Categories</p>

                <ul>
                  <li>
                    <a href="#" className="footer-link hover-2">
                      Action
                    </a>
                  </li>

                  <li>
                    <a href="#" className="footer-link hover-2">
                      Business
                    </a>
                  </li>

                  <li>
                    <a href="#" className="footer-link hover-2">
                      Adventure
                    </a>
                  </li>

                  <li>
                    <a href="#" className="footer-link hover-2">
                      Canada
                    </a>
                  </li>

                  <li>
                    <a href="#" className="footer-link hover-2">
                      America
                    </a>
                  </li>

                  <li>
                    <a href="#" className="footer-link hover-2">
                      Curiosity
                    </a>
                  </li>

                  <li>
                    <a href="#" className="footer-link hover-2">
                      Animal
                    </a>
                  </li>

                  <li>
                    <a href="#" className="footer-link hover-2">
                      Dental
                    </a>
                  </li>

                  <li>
                    <a href="#" className="footer-link hover-2">
                      Biology
                    </a>
                  </li>

                  <li>
                    <a href="#" className="footer-link hover-2">
                      Design
                    </a>
                  </li>

                  <li>
                    <a href="#" className="footer-link hover-2">
                      Breakfast
                    </a>
                  </li>

                  <li>
                    <a href="#" className="footer-link hover-2">
                      Dessert
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-list">
                <p className="footer-list-title">Address</p>

                <address className="footer-text address">
                  123 Main Street <br />
                  New York, NY 10001
                </address>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
