import React, {FormEvent, useState} from 'react';
import {isEmptyOrWhitespace, login, register} from '../../Api/Api'

export default function CommentBox(props: { setJwt: (content: string) => void }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <div>
        <div>
            <form acceptCharset="utf-8">
                <label>
                    <input value={username} className="form-control-lg form-control input"
                           onInput={e => setUsernameEvent(e)} type="text" name="username"
                           placeholder="Username" required/>
                    <br/><br/>
                    <input value={password} className="form-control-lg form-control input"
                           onInput={e => setPasswordEvent(e)} type="password" name="password"
                           placeholder="Password" required/>
                    <br/><br/>
                    <button onClick={loginEvent} type="button" name="login" className="btn btn-primary login">Login</button>
                    <button onClick={registerEvent} type="button" name="register" className="btn btn-primary login">Register</button>
                </label>
            </form>
        </div>
    </div>

    function setUsernameEvent(e: FormEvent<HTMLInputElement>) {
        let element = e.target as HTMLInputElement
        setUsername(element.value)
    }

    function setPasswordEvent(e: FormEvent<HTMLInputElement>) {
        let element = e.target as HTMLInputElement
        setPassword(element.value)
    }

    async function loginEvent(e: React.MouseEvent) {
        if (isEmptyOrWhitespace(username) || isEmptyOrWhitespace(password)) {
            alert("Username and password are mandatory")
            return;
        }

        try {
            await login(username, password);
        } catch (e) {
            // @ts-ignore
            alert("Login failed: " + e.message);
            return;
        }

        const jwt = localStorage.getItem("jwt");

        if (jwt == null) {
            alert("Login failed, JWT empty");
            return;
        }

        props.setJwt(jwt);
    }

    async function registerEvent(e: React.MouseEvent) {
        if (isEmptyOrWhitespace(username) || isEmptyOrWhitespace(password)) {
            alert("Username and password are mandatory")
            return;
        }

        try {
            await register(username, password);
        } catch (e) {
            // @ts-ignore
            alert("Register failed: " + e.message);
            return;
        }

        const jwt = localStorage.getItem("jwt");

        if (jwt == null) {
            alert("Register failed, JWT empty");
            return;
        }

        props.setJwt(jwt);
    }
}