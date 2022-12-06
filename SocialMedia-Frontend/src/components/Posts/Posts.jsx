import React, { useMemo, useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/PostAction";
import { useParams, useLocation } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();
  const { pathname } = useLocation();

  const newPosts = useMemo(() => {
    if (pathname === "/home") {
      return posts;
    }

    const val = posts.filter((post) => post.userId === params.id);
    return val;
  }, [posts, params.id, pathname]);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (newPosts.length === 0) return "No Posts";

  return (
    <div className="Posts">
      {loading
        ? "Fetching posts..."
        : newPosts.map((post, id) => {
            return <Post key={post._id} data={post} id={id} />;
          })}
    </div>
  );
};

export default Posts;
