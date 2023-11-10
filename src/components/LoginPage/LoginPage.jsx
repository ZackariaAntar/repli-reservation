import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import ChangePassword from '../ChangePassword/ChangePassword';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LoginPage() {
  const history = useHistory();
  const changePassword = useSelector((store)=>store.changePassword)


  return (
    <div>
      {changePassword.change ?  <ChangePassword /> : <LoginForm /> }


      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
