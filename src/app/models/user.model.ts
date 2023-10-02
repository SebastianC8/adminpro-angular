export class User
{

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public isGoogleAccount?: boolean,
        public img?: string,
        public role?: string,
        public uid?: string
    ) {}

}