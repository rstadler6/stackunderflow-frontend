import {User} from "./User";

export class Comment {
    constructor(user: User, content: string) {
        this.user = user;
        this.content = content;
    }

    id: number;
    upvotes: number;
    user: User;
    content: string;
    timestamp: Date;
    accepted: boolean;
}