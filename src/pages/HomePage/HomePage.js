import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getPosts } from "../../WebAPI";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./HomePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectLoader, toggleOpen, toggleOff } from "../../redux/loaderSlice";

const Root = styled.div`
  text-align: center;
  text-decoration: none;
`;

const PostContainer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 50%;
`;

const PostTitle = styled(Link)`
  font-size: 36px;
  text-decoration: none;
  color: black;
  text-decoration: underline;
  :hover { text-decoration-color: #f4bf2c; }
  text-align: left;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.5);
  margin-bottom:50px;
  text-align: left;
`;
const PageSign = styled.div`
  @media (max-width: 460px){
    display: block;
    margin: 10px 10px;
  }
  margin: 20px 20px;
  display: inline-block;
  padding: 10px;
  color:#aaaaaa;
`;
const Button = styled.span`
  border: 0;
  background: none;
  cursor: pointer;
  padding: 5px;
  margin: 10px;
  font-size: 11px;
  color: #aaaaaa;
  text-transform: uppercase;
  letter-spacing: 3px;
  :hover {
    color:black;
  }
`;
const PageFunction = styled.div`
  margin-top: 50px;
  @media (max-width: 460px){
    margin: 10px 10px;
  }
`;

// const PostThumbnail = styled.div`
//   width:60%;
//   border:2px solid red;
//   height:80vh;
// `

const PostContent = styled.div`
  margin-top: 20px;
  height:100px;
  width:100%;
  overflow: hidden;
  white-space: nowrap; 
  text-overflow: ellipsis;
  word-break: break-all;
`

function SelfIntroduceBlock() {
  return (
    <div className="simpleIntroduce__container">
      <div className="simpleIntroduce__textContainer">
        <h1 className="simpleIntroduce__content">A personal blog</h1>
        <h1 className="simpleIntroduce__content-major">Ri
          <span className="simpleIntroduce__content-sub">ck</span>
          y's</h1>
        <h3 className="simpleIntroduce__text">I am a frontend developer Based in Taipei</h3>
      </div>
    </div>
  )
}


function Post({ post }) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const editTime = new Date(post.createdAt)
  return (
    <PostContainer>
      {/* <PostThumbnail/> */}
      <div className="post__desc">
        <PostDate>{months[editTime.getMonth()]}. {editTime.getDate()}, {editTime.getFullYear()}</PostDate>
        <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
        <PostContent>{post.body}</PostContent>
      </div>
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
  const itemPerPage = 5;
  const dispatch = useDispatch()
  const handleLoader = useSelector(selectLoader)

  useEffect(() => {
    getPosts(page, itemPerPage).then((post) =>
      setTotalPage(Math.ceil(post.headers.get("X-Total-Count") / itemPerPage))
    );

    dispatch(toggleOpen())
    getPosts(page, itemPerPage)
      .then((res) => res.json())
      .then((posts) => {
        dispatch(toggleOff())
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
    if (handleLoader) {
      return;
    }
    setPage(newSet);
    dispatch(toggleOpen())
    getPosts(newSet, itemPerPage)
      .then((res) => res.json())
      .then((posts) => {
        dispatch(toggleOff())
        setPosts(posts);
      });
  }


  return (
    <Root>
      <SelfIntroduceBlock/>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <PageFunction>
        <Button onClick={handleFirstPage}>First</Button>
        <Button onClick={handlePreviousPage}>Previous</Button>
        <PageSign>
          {page} / {totalPage}
        </PageSign>
        <Button onClick={handleNextPage}>Next</Button>
        <Button onClick={handleLastPage}>Last</Button>
      </PageFunction>
    </Root>
  );
}
