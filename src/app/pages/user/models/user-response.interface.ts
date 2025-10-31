export interface UserResponse {
    userId: number;
    userName: string;
    email: string;
    image: string | null;
    authType: string;
    auditCreateDate: string;
    state: number;
    stateUser: string;
    badgeColor: string;
    icEdit: object;
    icDelete: object;
}

export interface UserByIdResponse {
    userId: number;
    userName: string;
    email: string;
    image: string | null;
    authType: string;
    state: number;
}