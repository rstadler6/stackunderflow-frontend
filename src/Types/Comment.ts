import {User} from "./User";

export class Comment {
    constructor(content: string) {
        this.content = content;
    }

    id: number;
    upvotes: number;
    creator: User;
    content: string;
    timestamp: Date;
}