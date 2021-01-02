import React from "react";
import styled from "styled-components";

const AboutMeContainer = styled.div`
  text-align: center;
  width: 570px;
  margin: 80px auto;
  box-shadow: 5px 10px rgba(0, 0, 0, 0.5);
`;
const Picture = styled.div`
  height: 300px;
  padding: 10px auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const Description = styled.div`
  padding: 20px;
`;

export default function AboutMePage() {
  return (
    <AboutMeContainer>
      <Picture></Picture>
      <Description>這裡是一個超簡易部落格＾＾歡迎光臨</Description>
    </AboutMeContainer>
  );
}
