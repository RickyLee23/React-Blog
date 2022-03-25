import React, { useEffect } from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { getMe } from "../WebAPI";
import RegisterPage from "../pages/RegisterPage";
// import AboutMePage from "../pages/AboutMePage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import NewPostPage from "../pages/NewPostPage";
import Header from "./Header";
import Footer from "./Footer";
import { AuthContext } from "../contexts";
import "../App.css";
import { useSelector } from "react-redux";
import { selectLoader } from "../redux/loaderSlice";
import Loader from "./Loader/Loader";

const Root = styled.div`
`;
const SpaceDistrubution = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width:100%;
`;
const Space = styled.div`
  min-height:90vh;
`;

function App() {
  const [user, setUser] = React.useState(null);
  const handleLoader = useSelector(selectLoader)
 
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
            {handleLoader && <Loader/>}
            <Header />
            <Space>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/post/:id">
                  <PostPage />
                </Route>
                {/* <Route exact path="/aboutMe">
                  <AboutMePage />
                </Route> */}
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
