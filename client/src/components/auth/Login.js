import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.admin === true) {
        this.props.history.push('/dashboard');
      } else {
        this.props.history.push('/question');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      if (nextProps.auth.user.admin === true) {
        this.props.history.push('/dashboard');
      } else {
        this.props.history.push('/question');
      }
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="">
        <Helmet>
          <style>
            {
              'body { background-color: #007bff; background: linear-gradient(to right, #0062E6, #33AEFF);}'
            }
          </style>
        </Helmet>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Log in</h5>
                <form className="form-signin" onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    id="inputEmail"
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                    id="inputPassword"
                  />
                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                  <hr />
                  <small className="ml-2 mr-1"> Don't Have account?</small>
                  <Link to="/register">Register</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
