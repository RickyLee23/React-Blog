import React, { useEffect, useState } from "react";
import { getPost } from "../../WebAPI";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const PostTitle = styled.div`
  font-size: 30px;
`;
const PostDate = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const PostContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.7);
  width: 500px;
  margin: 80px auto;
  padding: 20px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  word-break: break-word;
`;

const Post = ({ post }) => {
  if (!post) return null;
  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      <div>{post.body}</div>
    </PostContainer>
  );
};

export default function PostPage() {
  const [post, setPost] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getPost(id).then((data) => {
      setPost(data);
    });
  }, [id]);

  return <Post post={post} />;
}
