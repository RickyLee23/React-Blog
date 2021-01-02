import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";

const HeaderContainer = styled.div`
  height: 70px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 10px;
  right: 10%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background: #f0e862;
  box-sizing: border-box;
  box-shadow: 5px 10px #888888;
`;
const Brand = styled.span`
  font-size: 25px;
  margin-left: 20px;
  margin-right: 40px;
`;
const Block = styled(Link)`
  margin: 0px 20px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  ${(props) =>
    props.$active &&
    `
    border-top:2px solid black;
    border-bottom:2px solid black;
    padding-bottom:2px;
    font-size:20px;
    `}
`;

const NavSection1 = styled.div`
  display: flex;
  align-items: center;
`;

const NavSection2 = styled.div``;

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
        <Brand>你的第一個部落格</Brand>
        <Block to="/" $active={location.pathname === "/"}>
          首頁
        </Block>
        <Block to="/aboutMe" $active={location.pathname === "/aboutMe"}>
          關於我
        </Block>
        {user && (
          <Block to="/newPost" $active={location.pathname === "/newPost"}>
            發布文章
          </Block>
        )}
      </NavSection1>
      <NavSection2>
        <Block to="/register" $active={location.pathname === "/register"}>
          註冊
        </Block>
        {!user && (
          <Block to="/login" $active={location.pathname === "/login"}>
            登入
          </Block>
        )}
        {user && <Block onClick={handleLogout}>登出</Block>}
      </NavSection2>
    </HeaderContainer>
  );
}
