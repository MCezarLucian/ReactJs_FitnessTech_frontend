export type User = {
    email: string,
    username: string,
    password: string,
    name: string,
    gender: string,
    height: number,
    weight: number,
    age: number,
    role: string,
    problems: string[];
    registrationDate: Date;
    valid: boolean;
    history: UserHistory[];
    image: string;
    confirmed: boolean;
}

export type UserHistory = {
    weight: number;
    date: Date;
}

export type UserContextType = {
    users: User[],
    setUsers: React.Dispatch<React.SetStateAction<User[]>>,
    getUsers: any,
}