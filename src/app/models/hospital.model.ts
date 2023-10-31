interface _hospitalUser {
    _id: string;
    name: string;
    img: string;
}

export class Hospital
{
    constructor(
        public name: string,
        public _id?: string,
        public user?: _hospitalUser,
        public img?: string
    ) {}
}