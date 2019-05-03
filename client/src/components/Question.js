import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { clearCurrentProfile } from '../actions/profileActions';

import InputField from './InputField';
import '../App.css';

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import Countdown from 'react-countdown-now';

import Spinner from './Spinner';

class Question extends Component {
  state = {};
  json = [];
  current = 1;
  totalQuestion = 0;
  totalPage = 5;
  currentTime = 0;

  handleLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showLog = e => {};

  onChange = (current, pageSize) => {
    this.json = [];
    this.forceUpdate();
    axios
      .get(`http://159.65.151.117:5000/api/question?pageNo=${current}`)
      .then(response => {
        this.json = response.data;
        this.current = current;
        this.forceUpdate();
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    axios
      .get('http://159.65.151.117:5000/api/question/all')
      .then(response => {
        this.totalQuestion = response.data.length;
        let n = response.data.length;

        // if (n > 10) {
        //   while (n >= 10) {
        //     n = n / 10;
        //   }
        //   this.totalPage = parseInt(n + 1);
        // } else {
        //   this.totalPage = 1;
        // }

        axios
          .get('http://159.65.151.117:5000/api/question?pageNo=1')
          .then(response => {
            this.json = response.data;
            this.currentTime = Date.now();
            this.forceUpdate();
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  onSubmitHandler = e => {
    // e.preventDefault();
    let newArray = {};
    let i;

    console.log(this.state);

    for (i in this.state) {
      newArray[i] = this.state[i];
    }

    axios
      .post('http://159.65.151.117:5000/api/question/submit', { newArray })
      .then(this.props.history.push('/submit'));
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <div className="row mt-4">
          <div className="col-8" />
          <div className="col end">
            {user.name}
            <button
              onClick={this.handleLogoutClick}
              className=" ml-2 btn btn-success"
            >
              Logout
            </button>
          </div>
        </div>
        <Countdown
          date={this.currentTime + 600000}
          onComplete={this.onSubmitHandler}
        />

        {this.json.length > 0 ? (
          <div>
            <Pagination
              onChange={this.onChange}
              current={this.current}
              total={this.totalQuestion}
            />

            <form>
              {this.json.map((question, index) => (
                <div className="custom-card p-4 mb-4" key={index}>
                  <h4>
                    {' '}
                    {this.current === 1
                      ? 1 + index
                      : 10 * (this.current - 1) + index + 1}
                    {'.'}
                    {question.question}
                  </h4>

                  <InputField
                    options={question}
                    onChange={this.handleOnChange}
                    selected={this.state[question.questionId]}
                  />
                </div>
              ))}
            </form>
            {this.current === this.totalPage ? (
              <button
                className="btn btn-primary btn-block mb-4 "
                onClick={this.onSubmitHandler}
              >
                Submit
              </button>
            ) : (
              <div className="mb-4">
                <Pagination
                  onChange={this.onChange}
                  current={this.current}
                  total={this.totalQuestion}
                />
              </div>
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

Question.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Question);
