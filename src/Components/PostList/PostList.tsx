import React, {FormEvent, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Post} from "../../Types/Post";
import {createPost, getPosts, isEmptyOrWhitespace, register} from "../../Api/Api";

export default function PostList(props: { loaded: boolean, setLoaded: (loaded: boolean) => void }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newestFirst, setNewestFirst] = useState(true);

    useEffect(() => {
        initPosts();
    }, [props.loaded]);

    return (
        <ul>
            <button onClick={sortEvent}>Reverse Sort</button>
            {props.loaded ? showPosts() : "Loading..."}
        </ul>
    )

    function showPosts() {
        if (!newestFirst) {
            return posts.reverse().map(post =>
                <li className="list-group-item">
                    <Link to={"/posts/" + post.id} type="button">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-title">{post.title}</p>
                                <p className="card-text">{post.content}</p>
                                <p className="card-text">{post.creator === null ? "User1" : post.creator.username}</p>
                                <p className="card-text">{post.timestamp}</p>
                            </div>
                        </div>
                    </Link>
                </li>);
        }

        return posts.map(post =>
            <li className="list-group-item">
                <Link to={"/posts/" + post.id} type="button">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">{post.title}</p>
                            <p className="card-text">{post.content}</p>
                            <p className="card-text">{post.creator === null ? "User1" : post.creator.username}</p>
                            <p className="card-text">{post.timestamp}</p>
                        </div>
                    </div>
                </Link>
            </li>);
    }

    async function initPosts() {
        setPosts(await getPosts());
        props.setLoaded(true);
    }

    async function sortEvent(e: React.MouseEvent) {
        setNewestFirst(!newestFirst);
    }
}