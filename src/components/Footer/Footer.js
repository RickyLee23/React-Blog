import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  margin: 10px auto 0px auto;
  height: 30px;
  right: 10%;
  background: #70cceb;
  box-shadow: -5px -5px #888888;
  width: 80%;
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <div>Copyright 2020, Example Corporation</div>
    </FooterContainer>
  );
}
