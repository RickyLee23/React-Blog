import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getPosts } from "../../WebAPI";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./HomePage.scss"

const Root = styled.div`
  text-align: center;
  text-decoration: none;
`;
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
const PostContainer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin: 10px auto;
  cursor: pointer;
  border-radius: 10px;
  :hover {
    background: white;
    box-shadow: 5px 10px #2db7eb;
    transition-duration: 0.5s;
  }
  :active {
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  width: 400px;
  text-align: left;
  text-decoration: none;
  color: black;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;
const PageSign = styled.div`
  margin: 20px 20px;
  display: inline-block;
  padding: 10px;
`;
const Button = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
  outline: none;
  :active {
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`;
const PageFunction = styled.div`
  margin-top: 50px;
`;



function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemPerPage = 5;

  useEffect(() => {
    getPosts(page, itemPerPage).then((post) =>
      setTotalPage(Math.ceil(post.headers.get("X-Total-Count") / itemPerPage))
    );

    setIsLoading(true);
    getPosts(page, itemPerPage)
      .then((res) => res.json())
      .then((posts) => {
        setIsLoading(false);
        setPosts(posts);
      });
  }, [page]);

  const handleFirstPage = () => {
    pageChanged(1, itemPerPage);
  };

  const handleLastPage = () => {
    pageChanged(totalPage, itemPerPage);
  };
  const handlePreviousPage = () => {
    if (page !== 1) {
      pageChanged(page - 1, itemPerPage);
    }
  };

  const handleNextPage = () => {
    if (page !== totalPage) {
      pageChanged(page + 1, itemPerPage);
    }
  };

  function pageChanged(newSet, itemPerPage) {
    if (isLoading) {
      return;
    }
    setPage(newSet);
    setIsLoading(true);
    getPosts(newSet, itemPerPage)
      .then((res) => res.json())
      .then((posts) => {
        setIsLoading(false);
        setPosts(posts);
      });
  }

  return (
    <Root>
      {isLoading && <Loading>Loading....</Loading>}
      <div className="simpleIntroduce__container">
        <div className="simpleIntroduce__textContainer">
          <h1 className="simpleIntroduce__content">A personal blog</h1>
          <h1 className="simpleIntroduce__content-major">Ri
            <span className="simpleIntroduce__content-sub">ck</span>
            y's</h1>
          <h3 className="simpleIntroduce__text">I am a frontend developer <br/> Based in Taipei</h3>
        </div>
      </div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <PageFunction>
        <Button onClick={handleFirstPage}>第一頁</Button>
        <Button onClick={handlePreviousPage}>上一頁</Button>
        <PageSign>
          {page} / {totalPage}
        </PageSign>
        <Button onClick={handleNextPage}>下一頁</Button>
        <Button onClick={handleLastPage}>最後一頁</Button>
      </PageFunction>
    </Root>
  );
}
