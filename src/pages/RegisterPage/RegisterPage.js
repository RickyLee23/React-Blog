import React, { useState } from "react";
import { register } from "../../WebAPI";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import "./Register.scss"
import ButtonDefault from "../../share/button/ButtonDefault";

const ErrorMessage = styled.div`
  color: red;
  margin-top:50px;
  text-transform:capitalize;
`;
const RegisterPageWrapper = styled.div`
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

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = () => {
    setErrorMessage(null);
    register(nickname, username, password).then((data) => {
      if (data.ok === 0) {
        setErrorMessage(data.message);
      } else if (data.ok === 1) {
        history.push("/login");
      }
    });
  };

  return (
    <RegisterPageWrapper>
      <div className="register__title">Register</div>
      <form onSubmit={handleSubmit}>
        <InputInfo>
          Nickname:
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </InputInfo>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputInfo>
        <ButtonDefault></ButtonDefault>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </RegisterPageWrapper>
  );
}
