import React from 'react';
import BookCard from '../common/components/BookCard';

const BooksCatalog = () => {
  return (
    <div className="container-fluid">
      <div className="row page-info">
        <div className="col m1"></div>
        <div className="col m8">
          <h5>HelloBooks Book Catalog</h5>
        </div>
        <div className="col m2 s12">
          <label htmlFor="bookCategory">Category</label>
          <select className="browser-default">
            <option value="" disabled selected>Choose Book Category</option>
            <option value="1">All</option>
            <option value="2">Novels</option>
            <option value="3">Documentaries</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col m1"></div>
        <BookCard
          id="2"
          name="A Man In His Prime"
          author="Deward Stewart"
          description="A twenty first century book on Java processes and software development"
          image="https://lorempixel.com/100/190/nature/6"
        />
        <BookCard
          id="2"
          name="Thinking in Java"
          author="Deward Stewart"
          description="A twenty first century book on Java processes and software development"
          image="https://lorempixel.com/100/190/nature/2"
        />
        <BookCard
          id="2"
          name="Thinking in Java"
          author="Deward Stewart"
          description="A twenty first century book on Java processes and software development"
          image="https://lorempixel.com/100/190/nature/4"
        />
        <BookCard
          id="2"
          name="Thinking in Java"
          author="Deward Stewart"
          description="A twenty first century book on Java processes and software development"
          image="https://lorempixel.com/100/190/nature/3"
        />
        <BookCard
          id="2"
          name="Thinking in Java"
          author="Deward Stewart"
          description="A twenty first century book on Java processes and software development"
          image="https://lorempixel.com/100/190/nature/5"
        />
      </div>
      <div className="row">
        <div className="col m9"></div>
        <div className="col m3">
          <ul className="pagination">
            <li className="disabled">
              <a href="#!"><i className="material-icons">chevron_left</i>
              </a>
            </li>
            <li className="active"><a href="#!">1</a></li>
            <li className="waves-effect"><a href="#!">2</a></li>
            <li className="waves-effect"><a href="#!">3</a></li>
            <li className="waves-effect"><a href="#!">4</a></li>
            <li className="waves-effect"><a href="#!">5</a></li>
            <li className="waves-effect">
              <a href="#!"><i className="material-icons">chevron_right</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BooksCatalog;
