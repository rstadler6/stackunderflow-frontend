import {User} from "./User";

export class Comment {
    constructor(user: User, content: String) {
        this.user = user;
        this.content = content;
    }

    id: number;
    upvotes: number;
    user: User;
    content: String
}