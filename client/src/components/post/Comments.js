import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL_1 } from "../../constants/urls";
import { get } from "../../utils/apiHelper";

const UserscommentedPosts = (props) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!props.auth?.isAuthenticated) {
            navigate("/login");
        }
    }, []);
    const [users, setUsers] = useState([]);
    const { postId } = useParams();

    useEffect(() => {
        get(`${BASE_URL_1}/post/comment/${postId}`, `Bearer ${props.auth.token}`)
        .then(res => {
            setUsers(res.data.users);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <>
        <h1>User commented post</h1>
        <h4>**comment - username</h4>
        <br/><br />
        <hr />
        {users.map((user, index) => {
            return (
                <>
                <div>{user.comment} - {user.user.name}</div>
                <hr />
                </>
            )
        })}
        </>
    )
}

const mapstatetoprops = (state) => { return { auth: state.auth } }

export default connect(mapstatetoprops, null)(UserscommentedPosts);