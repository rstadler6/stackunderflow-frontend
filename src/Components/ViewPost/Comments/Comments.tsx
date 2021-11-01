import React, {FormEvent, useState} from 'react';
import {Post} from "../../../Types/Post";

export default function Comments(props: {post: Post}) {
    const [comments, setComments] = useState(props.post.comments);
    const [comment, setComment] = useState('');

    return (
    <div>
        {showComments()}
        <input onInput={setCommentEvent} type="text" placeholder="Comment"/>
        <button onClick={commentEvent}>Comment</button>
    </div>)

    function showComments() {
        return comments.map(comment => <div>{comment.content}</div>)
    }

    function setCommentEvent(e: FormEvent<HTMLInputElement>) {
        let element = e.target as HTMLInputElement
        setComment(element.value)
    }

    function updateComments() {
        return comments.map(comment => <div>{comment.content}</div>)
    }

    function commentEvent(e: React.MouseEvent) {
        return comments.map(comment => <div>{comment.content}</div>)
    }
}