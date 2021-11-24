import {User} from "./User";
import {Comment} from "./Comment";

export class Post {
    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    id: number;
    creator: User;
    title: string;
    content: string;
    timestamp: Date;
    upvotes: Number;
    comments: Comment[];
}