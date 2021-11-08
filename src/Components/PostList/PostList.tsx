import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Post} from "../../Types/Post";
import {createPost, getPosts, isEmptyOrWhitespace, votePost} from "../../Api/Api";

export default function PostList(props: { loaded: boolean, setLoaded: (loaded: boolean) => void }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const newestFirst = useState(true);

    useEffect(() => {
        initPosts();
    }, [props.loaded]);

    return (
        <ul>
            {props.loaded ? showPosts() : "Loading..."}
        </ul>
    )

    function showPosts() {
        return posts.map(post =>
            <li className="list-group-item">
                <Link to={"/posts/" + post.id} type="button">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-user">{post.user}</p>
                            <p className="card-title">{post.title}</p>
                            <p className="card-text">{post.content}</p>
                            <button onClick={e => voteEvent(e, post.id, 1)}>upvote</button> 0 <button onClick={e => voteEvent(e, post.id, -1)}>downvote</button>
                        </div>
                    </div>
                </Link>
            </li>);
    }

    async function initPosts() {
        setPosts(await getPosts());
        props.setLoaded(true);
    }

    async function voteEvent(e: React.MouseEvent, id: number, value: number) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        try {
            await votePost(id, 1);
            props.setLoaded(false);
        } catch (e) {
            // @ts-ignore
            alert("Upvote post failed: " + e.message);
            return;
        }
    }
}