import React, { useState, useContext } from "react";
import { newPost } from "../../WebAPI";
import { AuthContext } from "../../contexts";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ErrorMessage = styled.div`
  color: red;
`;
const NewPostPageWrapper = styled.div`
  margin: 100px auto;
  font-size: 20px;
  text-align: center;
`;
const Info = styled.div`
  margin: 0px auto;
`;
const User = styled.div`
  margin-bottom: 40px;
`;
const Textarea = styled.textarea`
  width: 50%;
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

export default function NewPostPage() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    newPost(title, content).then((data) => {
      if (data.ok === 0) {
        setErrorMessage(data.message);
      }
      history.push("/");
    });
  };
  if (!user) {
    return null;
  }
  return (
    <NewPostPageWrapper>
      <form onSubmit={handleSubmit}>
        <User>嗨，{user.username}，有什麼話要告訴大家的嗎？</User>
        <Info>Title:</Info>
        <Textarea
          cols="50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Info>Content:</Info>
        <Textarea
          rows="10"
          cols="50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div>
          <Button>送出</Button>
        </div>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </NewPostPageWrapper>
  );
}
