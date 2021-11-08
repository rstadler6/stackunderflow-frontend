import React, {FormEvent, useState} from 'react';
import {Post} from "../../../Types/Post";
import {commentPost, voteComment} from "../../../Api/Api";

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
        return comments.map(comment => <div>{comment.content}
            <button onClick={e => voteEvent(e, comment.id, 1)}>upvote</button> {comment.upvotes} <button onClick={e => voteEvent(e, comment.id, -1)}>downvote</button>
        </div>)
    }

    function setCommentEvent(e: FormEvent<HTMLInputElement>) {
        let element = e.target as HTMLInputElement
        setComment(element.value)
    }

    function updateComments() {
        return comments.map(comment => <div>{comment.content}</div>)
    }

    async function commentEvent(e: React.MouseEvent) {
        try {
            const post = await commentPost(props.post.id, new Comment(comment));
            //setComments(post.comments);
            //props.setLoaded(false);
        } catch (e) {
            // @ts-ignore
            alert("Upvote post failed: " + e.message);
            return;
        }
    }

    async function voteEvent(e: React.MouseEvent, id: number, value: number) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        try {
            await voteComment(id, value);
            //props.setLoaded(false);
        } catch (e) {
            // @ts-ignore
            alert("Upvote post failed: " + e.message);
            return;
        }
    }
}