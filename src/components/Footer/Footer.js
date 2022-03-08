import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background: #e9e9e9;
  width: 100%;
  text-align: center;
  font-size: 14px;
  letter-spacing: 3px;
  color: #999999;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <div>Copyright © {new Date().getFullYear()}, Example Corporation</div>
    </FooterContainer>
  );
}
