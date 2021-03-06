import React, {FormEvent, useEffect, useState} from 'react';
import {Post} from "../../../Types/Post";
import {Comment} from "../../../Types/Comment";
import {acceptComment, commentPost, getCommentVotes, getPost, voteComment} from "../../../Api/Api";

export default function Comments(props: {post: Post}) {
    const [comments, setComments] = useState(props.post.comments);
    const [comment, setComment] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        initVotes();
    }, []);

    return (
    <div>
        {showComments()}
        <input onInput={setCommentEvent} type="text" placeholder="Comment"/>
        <button onClick={commentEvent}>Comment</button>
    </div>)

    async function initVotes() {
        for (const comment of comments) {
            comment.upvotes = await getCommentVotes(comment.id)
        }

        setLoaded(true)
    }

    function showComments() {
        return comments.map(comment => <div className={comment.id === props.post.acceptedComment.id ? "accepted" : ""}>{comment.content} {comment.creator == null ? "User1" : comment.creator.username}
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
            const post: Post = await commentPost(props.post.id, new Comment(comment));
            setLoaded(false)
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
            setLoaded(false)
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
            setLoaded(false)
            //props.setLoaded(false);
        } catch (e) {
            // @ts-ignore
            alert("Accept comment failed: " + e.message);
            return;
        }
    }
}