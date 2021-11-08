import React, {FormEvent} from 'react';
import { useHistory } from "react-router-dom";
import {Post} from "../../Types/Post";
import {createPost, isEmptyOrWhitespace} from "../../Api/Api";

export default function CreatePost(props: { setLoaded: (loaded: boolean) => void }) {
    const history = useHistory();
    let title: string;
    let content: string;

    return (<div>
            <form acceptCharset="utf-8" onSubmit={e => preventFormReturn(e)}>
                <label>
                    <input onInput={e => setCheckInEvent(e)} type="text" name="title"
                           required/>
                    <br/><br/>
                    <input onInput={e => setCheckOutEvent(e)} type="text" name="content"
                           required/>
                    <br/><br/>
                    <button type="button" onClick={createPostEvent}>Create Post</button>
                </label>
            </form>
        </div>)

    function setCheckInEvent(e: FormEvent<HTMLInputElement>) {
        let element = e.target as HTMLInputElement;
        title = element.value;
    }

    function setCheckOutEvent(e: FormEvent<HTMLInputElement>) {
        let element = e.target as HTMLInputElement
        content = element.value;
    }

    async function createPostEvent(e: React.MouseEvent) {
        if (isEmptyOrWhitespace(title) || isEmptyOrWhitespace(content)) {
            alert("Title and Content are mandatory")
            return;
        }

        try {
            const post = new Post(title, content);
            await createPost(post);
            history.push("/")
        } catch (e) {
            // @ts-ignore
            alert("Create post failed: " + e.message);
            return;
        }
    }

    function preventFormReturn(e) {
        e.preventDefault();
    }
}