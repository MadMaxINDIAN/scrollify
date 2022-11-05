import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL_1 } from "../../constants/urls";
import { get } from "../../utils/apiHelper";

const UsersLikedPosts = (props) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!props.auth?.isAuthenticated) {
            navigate("/login");
        }
    }, []);
    const [users, setUsers] = useState([]);
    const { postId } = useParams();

    useEffect(() => {
        get(`${BASE_URL_1}/post/liked/${postId}`, `Bearer ${props.auth.token}`)
        .then(res => {
            setUsers(res.data.users);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <>
        <h1>User liked post</h1>
        <h4>**username</h4>
        <br/><br />
        <hr />
        {users.map((user, index) => {
            return (
                <div>{user.name}</div>
            )
        })}
        </>
    )
}

const mapstatetoprops = (state) => { return { auth: state.auth } }

export default connect(mapstatetoprops, null)(UsersLikedPosts);