import {User} from "./User";

export class Comment {
    constructor(user: User, content: string) {
        this.creator = user;
        this.content = content;
    }

    id: number;
    upvotes: number;
    creator: User;
    content: string;
    timestamp: Date;
    accepted: boolean;
}