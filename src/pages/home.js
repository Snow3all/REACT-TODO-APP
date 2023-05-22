import { useState, useEffect } from "react";
import styled from "styled-components";

const WrapperLoginSession = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: red;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background: rgb(205, 219, 244);
  background: linear-gradient(
    109deg,
    rgba(205, 219, 244, 1) 0%,
    rgba(229, 209, 223, 1) 100%
  );
`;

const DotRed = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: red;
`;

const DotGreen = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: green;
`;

const DotYellow = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: yellow;
`;

const AlertValidator = styled.span`
  color: red;
  font-size: 15px;
`;

const ModernInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 1rem;
  border: none;
  text-align: center;
`;

const BtnSignIn = styled.input`
  border: none;
  border-radius: 1rem;
  width: 100px;
  height: 30px;
  cursor: pointer;
`;

const Home = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [isValidUsername, setIsValidUsername] = useState(false);

  const [isValidPassword, setIsValidPassword] = useState(false);

  useEffect(() => {
    const validateField = () => {
      const isValid = username.trim() !== "";
      setIsValidUsername(isValid);
    };
    validateField();
  }, [username]);

  useEffect(() => {
    const validateField = () => {
      const isValid = password.trim() !== "";
      setIsValidPassword(isValid);
    };
    validateField();
  }, [password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      };
      await fetch(
        "https://candidate.neversitup.com/todo/users/auth",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            sessionStorage.setItem("token", data.token);
            window.location.href = "/dashboard";
          } else {
            alert(data.message)
          }
        });
    }
  };

  return (
    <div className='relative w-full h-screen'>
      <WrapperLoginSession className='p-2'>
        <h1 className='text-center'>MY TODO</h1>
        <div className='flex justify-center'>
          <DotRed />
          <DotGreen className='mx-2' />
          <DotYellow />
        </div>
        <div className='form my-4'>
          <form onSubmit={onSubmit} className='text-center'>
            <div className='my-2'>
              <div>
                <ModernInput
                  type='text'
                  placeholder='Username'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {!isValidUsername && (
                <div>
                  <AlertValidator>Please fill username !</AlertValidator>
                </div>
              )}
            </div>
            <div className='my-4'>
              <div>
                <ModernInput
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {!isValidPassword && (
                <div>
                  <AlertValidator>Please fill password !</AlertValidator>
                </div>
              )}
            </div>
            <div className='my-4'>
              <BtnSignIn type='submit' value='SIGN IN' />
            </div>
          </form>
        </div>
      </WrapperLoginSession>
    </div>
  );
};

export default Home;
