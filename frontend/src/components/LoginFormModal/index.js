import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true)
  const { closeModal } = useModal();
  const history = useHistory()

  useEffect(() => {
    if (credential.length >= 4 && password.length >= 6) {
      setButtonIsDisabled(false)
    } else {
      setButtonIsDisabled(true)
    }
  }, [credential, password])

  const handleClickDemoUser = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
      .then(() => {
        closeModal()
        history.push('/')
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        closeModal()
        history.push('/')
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="login-form">
      <h1>Log In</h1>
      {errors.credential && (
        <p className="credential-errors">{errors.credential}</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={buttonIsDisabled}>Log In</button>
        <a className="demo-user-link" href="#" onClick={handleClickDemoUser}>Demo User</a>
      </form>
    </div>
  );
}

export default LoginFormModal;
