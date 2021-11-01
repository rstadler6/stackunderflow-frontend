import {User} from "../Types/User"
import {Post} from "../Types/Post"

export async function createPost(post: Post) {
    const response = await fetch('http://localhost.fiddler:8080/posts/', {
        method: "POST",
        body: JSON.stringify(post),
        headers: new Headers(
            {'Authorization': 'Bearer ' + localStorage.getItem("jwt"), 'content-type': 'application/json'})
    })

    if (!response.ok) {
        alert(response.statusText)
    }

    return await response.json();
}

export async function getPost(id: number) {
    const response = await fetch('http://localhost:8080/posts/' + id, {
        method: "GET",
        headers: new Headers(
            {'Authorization': 'Bearer ' + localStorage.getItem("jwt"), 'content-type': 'application/json'})
    })

    if (!response.ok) {
        alert(response.statusText)
    }

    return await response.json();
}

export async function getPosts() {
    const response = await fetch('http://localhost:8080/posts/', {
        method: "GET",
        headers: new Headers(
            {'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
                'content-type': 'application/json'})
    })

    if (!response.ok) {
        alert(response.statusText)
    }

    return await response.json();
}

export async function getUsers() {
    const response = await fetch('http://localhost:8080/users/', {
        method: "GET",
        headers: new Headers(
            {'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
                'content-type': 'application/json'})
    })

    if (!response.ok) {
        alert(response.statusText)
    }

    return await response.json();
}

export async function createUser(user: User) {
    const response = await fetch('http://localhost:8080/users/', {
        method: "POST",
        body: JSON.stringify(user),
        headers: new Headers({'content-type': 'application/json'})
    })

    if (!response.ok) {
        alert(response.statusText)
    }
}

export async function updateUser(user: User) {
    const response = await fetch('http://localhost:8080/users/', {
        method: "PUT",
        body: JSON.stringify(user),
        headers: new Headers({'content-type': 'application/json'})
    })

    if (!response.ok) {
        alert(response.statusText)
    }
}

export async function deleteUser(username: string) {
    const response = await fetch('http://localhost:8080/users/' + username, {
        method: "DELETE",
        headers: new Headers(
            {'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
                'content-type': 'application/json'})
    })

    if (!response.ok) {
        alert(response.statusText)
    }
}

export async function login(username: string, password: string) {
    const response = await fetch('http://localhost:8080/auth/login', {
        method: "POST",
        body: JSON.stringify(new User(username, password, false, false)),
        headers: new Headers({'content-type': 'application/json'})
    })

    if (!response.ok) {
        alert(response.statusText)
    }

    localStorage.setItem('jwt', await response.text());
    await adminCheck(username);
}

export async function register(username: string, password: string) {
    const response = await fetch('http://localhost:8080/auth/register', {
        method: "POST",
        body: JSON.stringify(new User(username, password, false, false)),
        headers: new Headers({'content-type': 'application/json'})
    })

    if (!response.ok) {
        throw new Error();
    }

    localStorage.setItem('jwt', await response.text());
    await adminCheck(username);
}

export async function adminCheck(username: string) {
    const response = await fetch('http://localhost:8080/auth/adminCheck/' + username, {
        method: "GET"
    })

    if (!response.ok) {
        throw new Error();
    }

    localStorage.setItem('admin', await response.text());
}

export function isEmptyOrWhitespace(str: string) {
    return str === undefined || str === "" || str.match(/^ *$/) !== null;
}