import {User} from "./User";
import {Comment} from "./Comment";

export class Post {
    constructor(checkOut: Date, checkIn: Date) {
        this.checkOut = checkOut;
        this.checkIn = checkIn;
    }

    id: number;
    user: User;
    checkOut: Date;
    checkIn: Date;
    comments: Comment[];
}