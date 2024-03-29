import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";

const HeaderContainer = styled.div`
  position: fixed;
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  z-index:1;
  `;
const Brand = styled.span`
  font-size: 25px;
  margin-left: 20px;
  margin-right: 40px;
  font-weight: 800;
  text-transform: uppercase;
  `;
const Block = styled(Link)`
  @media (max-width: 600px) {
    margin: 10px 10px;
    font-size: 8px;
  }
  margin: 0px 20px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  font-size: 11px;  
  color: #aaaaaa;
  text-transform: uppercase;
  letter-spacing: 3px;
  ${(props) =>
    props.$active &&
    `
    color:black;
    `}
`;

const NavSection1 = styled.div`
  @media (max-width: 700px) {
      display: none;
  }
  display: flex;
  align-items: center;
  
  `;

const NavSection2 = styled.div`
  @media (max-width: 700px) {
    justify-content: space-around;
  }
  display: flex;
  justify-content: right;
  width:100%;
`;

export default function Header() {
  const history = useHistory();
  const location = useLocation(); //現在處於的 url
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthToken("");
    setUser("");
    if (location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <HeaderContainer>
      <NavSection1>
        <Brand>Your first blog.</Brand>
      </NavSection1>
      <NavSection2>
      <Block to="/" $active={location.pathname === "/"}>
        Home
      </Block>
      {/* <Block to="/aboutMe" $active={location.pathname === "/aboutMe"}>
        About
      </Block> */}
      {user && (
      <Block to="/newPost" $active={location.pathname === "/newPost"}>
        post
      </Block>
      )}
      <Block to="/register" $active={location.pathname === "/register"}>
        Register
      </Block>
      {!user && (
      <Block to="/login" $active={location.pathname === "/login"}>
        Login
      </Block>
      )}
      {user && (
      <Block to="/login" onClick={handleLogout}>
        Logout
      </Block>
      )}
      </NavSection2>
    </HeaderContainer>
  );
}
