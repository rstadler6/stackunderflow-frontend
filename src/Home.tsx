import React, {useState} from 'react';
import PostList from "./Components/PostList/PostList";

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    return (
        <div><PostList loaded={loaded} setLoaded={setLoaded}/></div>
    );
}