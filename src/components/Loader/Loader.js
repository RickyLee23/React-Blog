import Lottie from "lottie-react";
import loaderAnimation from "./loader.json";
import styled from "styled-components";


const Loading = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Loader() {

    return (
        <Loading>
            <Lottie animationData={loaderAnimation}></Lottie>
        </Loading>
    )
}