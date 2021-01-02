import React, { useState } from "react";
import { register } from "../../WebAPI";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ErrorMessage = styled.div`
  color: red;
`;
const RegisterPageWrapper = styled.div`
  text-align: center;
  margin: 100px;
`;
const InputInfo = styled.div`
  margin-bottom: 10px;
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
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
  outline: none;
  :active {
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
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
        <Button>送出</Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </RegisterPageWrapper>
  );
}
