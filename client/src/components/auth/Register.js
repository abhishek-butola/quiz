import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <Helmet>
          <style>
            {
              'body { background-color: #007bff; background: linear-gradient(to right, #0062E6, #33AEFF);}'
            }
          </style>{' '}
        </Helmet>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Register</h5>
                  <form className="form-signin" onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      id="inputName"
                      onChange={this.onChange}
                      error={errors.name}
                    />
                    <TextFieldGroup
                      placeholder="Email"
                      name="email"
                      id="inputEmail"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <TextFieldGroup
                      placeholder="Password"
                      name="password"
                      type="password"
                      id="inputPassword"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    <TextFieldGroup
                      id="inputConfirm"
                      placeholder="Confirm Password"
                      name="password2"
                      type="password"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
                    />
                    <input
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                    />
                    <hr />
                    <small className="ml-2 mr-1"> Already Have account?</small>
                    <Link to="/login">Login</Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
