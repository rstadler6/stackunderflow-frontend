import React, {FormEvent} from 'react';
import {Post} from "../../Types/Post";
import {createPost, isEmptyOrWhitespace} from "../../Api/Api";

export default function CreatePost(props: { setLoaded: (loaded: boolean) => void }) {
    let checkIn: string;
    let checkOut: string;

    return (<div>
            <form acceptCharset="utf-8" onSubmit={e => preventFormReturn(e)}>
                <label>
                    <input onInput={e => setCheckInEvent(e)} type="datetime-local" name="checkin"
                           required/>
                    <br/><br/>
                    <input onInput={e => setCheckOutEvent(e)} type="datetime-local" name="checkout"
                           required/>
                    <br/><br/>
                    <button type="button" onClick={createPostEvent}>Create Post</button>
                </label>
            </form>
        </div>)

    function setCheckInEvent(e: FormEvent<HTMLInputElement>) {
        let element = e.target as HTMLInputElement;
        checkIn = element.value;
    }

    function setCheckOutEvent(e: FormEvent<HTMLInputElement>) {
        let element = e.target as HTMLInputElement
        checkOut = element.value;
    }

    async function createPostEvent(e: React.MouseEvent) {
        if (isEmptyOrWhitespace(checkIn) || isEmptyOrWhitespace(checkOut)) {
            alert("CheckIn and CheckOut are mandatory")
            return;
        }

        try {
            const post = new Post(new Date(checkIn), new Date(checkOut));
            await createPost(post);
            props.setLoaded(false);
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