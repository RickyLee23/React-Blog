import React from "react";
import styled from "styled-components";

function AboutMePageContainer() {
  return (
    <div className="simpleIntroduce__container">
      <div className="simpleIntroduce__textContainer">
        <h1 className="simpleIntroduce__content-major">Ab
          <span className="simpleIntroduce__content-sub">out </span>
          Me</h1>
        <h3 className="simpleIntroduce__text">I am a frontend developer <br/> Based in Taipei</h3>
      </div>
    </div>
  )
}

export default function AboutMePage() {
  return (
    <AboutMePageContainer/>
  );
}
