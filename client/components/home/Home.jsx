import React from 'react';
import { Link } from 'react-router';
import background from '../../assets/img/background6.jpg';

/**
 *
 * Home component class
 * @class Home
 * @extends {React.Component}
 * @returns {Object} jsx component
 */
class Home extends React.Component {

  /**
   *
   * @returns {void} Nothing
   * @memberof Home
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    AOS.init();
    const header = document.getElementById('header-text');
    const typewriter = new Typewriter(header, {
      loop: true
    });
    typewriter.typeString('A World Class Online Book Library Application. Borrow A Book Today!')
      .pauseFor(2500)
      .deleteAll()
      .typeString('Read a book today and get energized!')
      .pauseFor(2500)
      .deleteChars(10)
      .typeString('empowered!')
      .start();
  }


  /**
   *
   *
   * @returns {void} nothing
   * @memberof Home
   */
  render() {
    return (
      <div>
        <div id="index-banner" className="parallax-container">
          <div className="section no-pad-bot">
            <div className="container">
              <br />
              <br />
              <h1 className="header center dark-blue-text">HelloBooks Online Library</h1>
              <div className="row center">
                <h5 id="header-text" className="header col s12 light dark-blue-text"></h5>
              </div>
              <div className="row center">
                <Link to="/signup">
                  <button className="waves-effect waves-light btn btn-large col s4 offset-s4  dark-blue-background " data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration={2000}>Get Started</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="parallax">
            <img src={background} alt="Unsplashed background img 1" />
          </div>
        </div>
        <div className="container">
          <div className="section application-info">
            {/*   Icon Section   */}
            <div className="row">
              <div className="col s12 m6 thumbnail-hb" data-aos="fade-up">
                <div className="icon-block">
                  <div className="image-block-borrow">
                  </div>
                  <h5 className="center">Borrow Books</h5>
                  <p className="light"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies
                  eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6 offset-m6 thumbnail-hb" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration={2000}>
                <div className="icon-block">
                  <div className="image-block-see">
                  </div>
                  <h5 className="center">View Books</h5>
                  <p className="light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies
                  eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6 thumbnail-hb" data-aos="fade-right" data-aos-offset={300} data-aos-easing="ease-in-sine">
                <div className="icon-block">
                  <div className="image-block-read">
                  </div>
                  <h5 className="center">Read Books</h5>
                  <p className="light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies
                  eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
};

export default Home;
