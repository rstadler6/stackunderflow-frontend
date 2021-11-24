import React, {FormEvent, useState} from 'react';
import {Post} from "../../../Types/Post";
import {acceptComment, commentPost, voteComment} from "../../../Api/Api";

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
        return comments.map(comment => <div className={comment.accepted ? "accepted" : ""}>{comment.content} {comment.creator}
            <button onClick={e => voteEvent(e, comment.id, 1)}>upvote</button> {comment.upvotes} <button onClick={e => voteEvent(e, comment.id, -1)}>downvote</button>
            <button onClick={e => acceptCommentEvent(e, props.post.id, comment.id)}>Accept Comment</button>
        </div>)
    }

    function setCommentEvent(e: FormEvent<HTMLInputElement>) {
        let element = e.target as HTMLInputElement
        setComment(element.value)
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
            alert("Upvote comment failed: " + e.message);
            return;
        }
    }

    async function acceptCommentEvent(e: React.MouseEvent, postId: number, id: number) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        try {
            await acceptComment(postId, id);
            //props.setLoaded(false);
        } catch (e) {
            // @ts-ignore
            alert("Accept comment failed: " + e.message);
            return;
        }
    }


}