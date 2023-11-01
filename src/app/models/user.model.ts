import { environment } from "src/environments/environment"

const API_URL = environment.base_url;

export class User
{

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public isGoogleAccount?: boolean,
        public img?: string,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string
    ) {}

    get getImage() {

        if (!this.img) {
            return `${API_URL}/upload/users/default-image.jpg`;
        } else if (this.img?.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${API_URL}/upload/users/${this.img}`;
        } else {
            return `${API_URL}/upload/users/default-image.jpg`;
        }
    }
}