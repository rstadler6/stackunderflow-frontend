import {User} from "./User";

export class Comment {
    constructor(user: User, content: String) {
        this.user = user;
        this.content = content;
    }

    user: User;
    content: String
}