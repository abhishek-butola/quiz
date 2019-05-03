import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { clearCurrentProfile } from '../actions/profileActions';

class AddQuestion extends Component {
  state = {
    question: '',
    one: '',
    two: '',
    three: '',
    four: '',
    answer: ''
  };
  componentDidMount() {
    if (!this.props.auth.user.admin) {
      this.props.history.push('/question');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.user.admin) {
      this.props.history.push('/question');
    }
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const question = {
      question: this.state.question,
      one: this.state.one,
      two: this.state.two,
      three: this.state.three,
      four: this.state.four,
      answer: this.state.answer
    };
    axios
      .post('http://159.65.151.117:5000/api/question', question)
      .then(response => {
        window.location.reload();
      });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <Helmet>
          <style>
            {
              'body { background-color: #007bff; background: linear-gradient(to right, #0062E6, #33AEFF);}'
            }
          </style>
        </Helmet>
        <div className="row ">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Add Question</h5>
                <form className="form-signin">
                  <div className="form-label-group">
                    <textarea
                      rows="4"
                      cols="50"
                      name="question"
                      id="inputQuestion"
                      onChange={this.onChangeHandler}
                      className="form-control"
                      placeholder="Enter Question"
                      value={this.state.question}
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      onChange={this.onChangeHandler}
                      name="one"
                      className="form-control"
                      placeholder="Option A"
                      value={this.state.one}
                      id="inputA"
                    />
                    <label htmlFor="inputA">Option A</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      onChange={this.onChangeHandler}
                      name="two"
                      id="optionB"
                      className="form-control"
                      placeholder="Option B"
                      value={this.state.two}
                    />
                    <label htmlFor="optionB">Option B</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      onChange={this.onChangeHandler}
                      name="three"
                      id="optionC"
                      className="form-control"
                      placeholder="Option C"
                      value={this.state.three}
                    />
                    <label htmlFor="optionC">Option C</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      name="four"
                      onChange={this.onChangeHandler}
                      className="form-control"
                      placeholder="Option D"
                      value={this.state.four}
                      id="optionD"
                    />
                    <label htmlFor="optionD">Option D</label>
                  </div>
                  <select
                    onChange={this.onChangeHandler}
                    name="answer"
                    className="custom-select custom-select-lg mb-3"
                  >
                    <option defaultValue="Answer">Answer</option>
                    <option value="1">A</option>
                    <option value="2">B</option>
                    <option value="3">C</option>
                    <option value="4">D</option>
                  </select>

                  <button
                    onClick={this.onSubmit}
                    type="submit"
                    className="btn btn-primary btn-block mb-3"
                  >
                    Submit
                  </button>
                  <Link to="/dashboard" className="  btn btn-block btn-success">
                    Back To Dashboard{' '}
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddQuestion.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(AddQuestion);
