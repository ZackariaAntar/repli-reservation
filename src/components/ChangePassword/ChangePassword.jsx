import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function ChangePassword(){
const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const changePassword = (event) => {
    event.preventDefault();

    if (username && oldPassword && newPassword) {
      dispatch({
        type: 'CHANGE_PASSWORD',
        payload: {
          username: username,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={changePassword}>
      <h2>Change your password</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="oldPassword">
          Old Password:
          <input
            type="password"
            name="oldPassword"
            required
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="newPassword">
          New Password:
          <input
            type="password"
            name="newPassword"
            required
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Change Password" />
      </div>
    </form>
  )
}

export default ChangePassword;