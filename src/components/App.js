import React, { useEffect } from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { getMe } from "../WebAPI";
import RegisterPage from "../pages/RegisterPage";
import AboutMePage from "../pages/AboutMePage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import NewPostPage from "../pages/NewPostPage";
import Header from "./Header";
import Footer from "./Footer";
import { AuthContext } from "../contexts";

const Root = styled.div`
  padding-top: 64px;
  background: rgba(245, 222, 179, 0.3);
`;
const SpaceDistrubution = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Space = styled.div`
  min-height: 650px;
`;

function App() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    getMe().then((response) => {
      if (response.ok) {
        setUser(response.data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <SpaceDistrubution>
            <Header />
            <Space>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/post/:id">
                  <PostPage />
                </Route>
                <Route exact path="/aboutMe">
                  <AboutMePage />
                </Route>
                <Route exact path="/newPost">
                  <NewPostPage />
                </Route>
                <Route path="/register">
                  <RegisterPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
              </Switch>
            </Space>
            <Footer />
          </SpaceDistrubution>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
