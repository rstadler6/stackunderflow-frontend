import React, {FormEvent, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

export default function Header(props: { setJwt: (content: string) => void }) {
    return (
        <div>
            <Link to="/"><button>Entries</button></Link>
            <Link to="/categories"><button>Categories</button></Link>
            <Link to="/users"><button>Users</button></Link>
            <button onClick={logout}>Logout</button>
        </div>
    )

    function logout() {
        localStorage.clear();
        props.setJwt("");
    }
}