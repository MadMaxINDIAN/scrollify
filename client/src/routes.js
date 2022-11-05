import { Navigate } from "react-router-dom";
import Layout from "./layout";
import Login from "./pages/Login";
import UsersLikedPosts from "./components/post/Likes";
import UsersCommentedPosts from "./components/post/Comments";
import PostPage from "./components/post";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: []
    },
    {
        path: "/post/liked/:postId",
        element: <UsersLikedPosts />
    },
    {
        path: "/post/comment/:postId",
        element: <UsersCommentedPosts />
    },
    {
        path: "/post/:postId",
        element: <PostPage />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: "*",
        element: <Navigate to={"/"} replace />,
    },
];

export default routes;