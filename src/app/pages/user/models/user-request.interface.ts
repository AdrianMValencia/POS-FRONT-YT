export interface UserRequest {
    userName: string | null;
    password: string | null;
    email: string | null;
    image: File | null;
    authType: string | null;
    state: number | null;
}