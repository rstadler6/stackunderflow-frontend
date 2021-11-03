import React, {useEffect, useState} from 'react';
import {Post} from "../../Types/Post";
import {getPosts} from "../../Api/Api";

export default function PostList(props: { loaded: boolean, setLoaded: (loaded: boolean) => void }) {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        initPosts();
    }, [props.loaded]);

    return (
        <div>
            {props.loaded ? showPosts() : "Loading..."}
        </div>
    )

    function showPosts() {
        return posts.map(post =>
            <div>{post.title}, {post.user} <button>upvote</button><button>downvote</button></div>);
    }

    async function initPosts() {
        setPosts(/*await*/ getPosts());
        props.setLoaded(true);
    }
}