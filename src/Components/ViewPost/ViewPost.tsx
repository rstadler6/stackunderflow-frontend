import React, {useEffect, useState} from 'react';
import {getPost} from "../../Api/Api";
import {useParams} from 'react-router-dom';
import {Post} from '../../Types/Post'
import Comments from "./Comments/Comments";

export default function ViewPost() {
    const {id} = useParams();
    const [post, setPost] = useState<Post>();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        initPost();
    });

    return (
        <div>
            {loaded ? showPost() : "Loading..."}
        </div>
    )

    function showPost() {
        return (<div>{post.checkIn} {post.checkOut}<Comments post={post}/></div>)
    }

    async function initPost() {
        setPost(await getPost(id));
        setLoaded(true);
    }
}