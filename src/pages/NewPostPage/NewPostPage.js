import React, { useState, useContext } from "react";
import { newPost } from "../../WebAPI";
import { AuthContext } from "../../contexts";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ButtonDefault from "../../share/button/ButtonDefault";

const ErrorMessage = styled.div`
  color: red;
`;
const NewPostPageWrapper = styled.div`
  margin-top: 20vh;
  font-size: 20px;
  text-align: center;
  /* border:2px solid red; */
  margin-left: auto;
  margin-right: auto;
`;
const Info = styled.div`
  margin: 0px auto;
  letter-spacing: 3px;
  text-align: left;
  width:50%;
  font-size: 16px;
`;
const User = styled.div`
  margin-bottom: 40px;
  text-align: center;
  width:100%;
`;
const Textarea = styled.textarea`
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: left;
  width:50%;
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
        <ButtonDefault></ButtonDefault>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </NewPostPageWrapper>
  );
}
