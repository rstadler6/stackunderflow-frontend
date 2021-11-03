import React, {FormEvent, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

export default function Header(props: { setJwt: (content: string) => void }) {
    return (
        <div>
            <Link to="/"><button>Home</button></Link>
            <Link to="/posts/create"><button>New Post</button></Link>
            <button onClick={logout}>Logout</button>
        </div>
    )

    function logout() {
        localStorage.clear();
        props.setJwt("");
    }
}