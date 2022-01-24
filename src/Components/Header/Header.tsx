import React, {FormEvent, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {logout} from '../../Api/Api'

export default function Header(props: { setJwt: (content: string) => void }) {
    return (
        <div>
            <Link to="/"><button>Home</button></Link>
            <Link to="/posts/create"><button>New Post</button></Link>
            <button onClick={logoutClick}>Logout</button>
        </div>
    )

    async function logoutClick() {
        await logout();
        localStorage.clear();
        props.setJwt("");
    }
}