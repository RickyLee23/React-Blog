import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { login, getMe } from "../../WebAPI";
import styled from "styled-components";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";
import "./Login.scss"

const ErrorMessage = styled.div`
  color: red;
  margin-top:50px;
  text-transform:capitalize;
`;

const LoginPageWrapper = styled.div`
  text-align: left;
  margin-top: 20vh;
  margin-bottom: 20vh;
  max-width:50vw;
  margin-right:auto;
  margin-left:auto;
`;
const InputInfo = styled.div`
  margin-bottom: 10px;
  letter-spacing: 3px;
`;
const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;
const Button = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  width:33%;
  margin-top:20px;
  box-shadow: 2px 2px 1px rgb(0 0 0 / 25%);
  background: #e9e9e9;
  color: rgba(0,0,0,0.7);
  :active {
    transform: translateY(2px);
  }
`;

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = () => {
    setErrorMessage(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null); // 有出錯，要順便把 token 清空
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push("/");
      });
    });
  };

  return (
    <LoginPageWrapper>
      <div className="login__title">Login</div>
      <form onSubmit={handleSubmit}>
        <InputInfo>
          Username:
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputInfo>
        <InputInfo>
          Password:
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputInfo>
        <Button className="btn__confirm">CONFIRM</Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </LoginPageWrapper>
  );
}
