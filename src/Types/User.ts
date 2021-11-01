export class User {
    constructor(username: string, password: string, admin: boolean, deactivated: boolean) {
        this.username = username;
        this.password = password;
        this.admin = admin;
        this.deactivated = deactivated;
    }

    username: string;
    password: string;
    admin: boolean;
    deactivated: boolean;
}