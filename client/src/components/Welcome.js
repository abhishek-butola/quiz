import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="row my-4">
          <div className="col-9">
            <img
              align="center"
              src={require('../uttaranchal.jpg')}
              width="65"
              height="65"
            />
            <span style={{ fontFamily: 'Cinzel', fontSize: '40px' }}>Quiz</span>
          </div>
          <div className="col-end">
            <div className="mt-2">
              <Link to="/register" className="btn btn-primary  ">
                Register
              </Link>
              <Link to="/login" className="btn btn-success ml-2 ">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="container m-5">
          <h1>Instruction</h1>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              There are 9 pages and 2 questions in this exam. You must answer
              both questions one and two.
            </li>
            <li class="list-group-item">
              Read the questions carefully and confine your responses to an
              analysis of the questions as written. Do not assume any facts not
              set forth in the questions.
            </li>
            <li class="list-group-item">
              You have four hours to complete the exam. I have given suggested
              times for each question, leaving one half hour to spare. You may
              allocate your time as you wish. I recommend that you spend some
              time organizing your thoughts before you begin to write and that
              you reserve some time to go over your responses after you have
              completed the exam.
            </li>
            <li class="list-group-item">
              You may refer to the Franklin & Rabin casebook, your class notes,
              a dictionary, and any outlines you have prepared yourself or with
              other students in the course. You may not refer to any commercial
              study aids or hornbooks.
            </li>
            <li class="list-group-item">
              Leave a left-margin of at least one inch on every page of your
              answers. If you are handwriting your answers, please write in
              bluebooks on every other line and on only one side of the page. If
              you are typing, please double space.
            </li>
          </ul>
          <div>
            <div className="row mt-4">
              <div className="col-sm" />
              <div className="col-sm">
                <Link
                  to="/login"
                  className="btn  btn-lg btn-block btn-primary    "
                >
                  Get Started
                </Link>
              </div>
              <div className="col-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
