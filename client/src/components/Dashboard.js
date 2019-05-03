import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { clearCurrentProfile } from '../actions/profileActions';
import Spinner from './Spinner';

class Dashboard extends Component {
  state = {
    api: []
  };
  componentDidMount() {
    if (!this.props.auth.user.admin) {
      this.props.history.push('/question');
    } else {
      axios
        .get('http://159.65.151.117:5000/api/question/dashboard')
        .then(response => {
          this.setState({ api: response.data });
        });
    }
  }

  handleLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.user.admin) {
      this.props.history.push('/question');
    }
  }
  onDeleteHandler(id) {
    console.log(id);
    axios
      .delete(`http://159.65.151.117:5000/api/question/dashboard/${id}`)
      .then(result => {
        const update = this.state.api.filter(arr => id !== arr.id);
        this.setState({ api: update });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="row my-4">
          <div className="col-6" />
          <div className="col end">
            Abhishek
            <Link to="/question" className=" ml-3 btn btn-primary">
              Question
            </Link>
            <Link to="/add" className=" ml-3 btn btn-success">
              Add Question
            </Link>
            <button
              onClick={this.handleLogoutClick}
              className=" ml-3 btn btn-danger"
            >
              Logout
            </button>
          </div>
        </div>
        {this.state.api.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Score</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.state.api.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {user.score !== undefined ? (
                    <td className="text-success">{user.score}</td>
                  ) : (
                    <td>Not tested</td>
                  )}
                  <td onClick={() => this.onDeleteHandler(user.id)}>
                    <i
                      className="fas fa-trash text-alert point"
                      style={{ color: '#c60000' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Dashboard);
