import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { FormGroup, TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { userActions } from "../_actions";

const LoginPage = (props) => {
  useEffect(() => {
    props.logout();
  }, []);
  // reset login status
  const [credential, setCredential] = useState({
    username: "",
    password: "",
    submitted: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCredential({ ...credential, submitted: true });
    const { username, password } = credential;
    if (username && password) {
      props.login(username, password);
    }
  };

  const { loggingIn } = props;
  const { username, password, submitted } = credential;
  return (
    <div className="container white-bg mt-4">
      <div className="row  col-md-offset-1">
        <div className="col-md-6">
          <h2>Login</h2>
          <ValidatorForm onSubmit={handleSubmit}>
            <div className={"form-group" + (submitted && !username ? " has-error" : "")}>
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" name="username" value={username} onChange={handleChange} />
              {submitted && !username && <div className="help-block">Username is required</div>}
            </div>
            <div className={"form-group" + (submitted && !password ? " has-error" : "")}>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
              {submitted && !password && <div className="help-block">Password is required</div>}
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Login</button>
              {loggingIn && (
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              )}
              <Link to="/register" className="btn btn-link">
                Register
              </Link>
            </div>
          </ValidatorForm>
        </div>
        <div className="col-md-6">{/* <img src="/../images/loginBack.JPG" alt="login" width="500" height="600" /> */}</div>
      </div>
    </div>
  );
};

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };