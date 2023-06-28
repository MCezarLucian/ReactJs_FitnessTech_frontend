import { FC, createContext, useState } from "react";
import { User, UserContextType } from "../models/user";
import getAxiosInstanceCustom from "../connection/axios_connection";

export const UserContext = createContext<UserContextType>({
    users: [],
    setUsers: () => {},
    getUsers: () => {},
});

const UserProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [users, setUsers] = useState<User[]>([]);
    const data: User[] = [];

    async function getUsers() {
        const response = await getAxiosInstanceCustom().get("/user");

        for(let i = 0; i < response.data.length; i++){
            data[i] = response.data[i];
        }
        return data;
    }

    return <UserContext.Provider value={{users, setUsers, getUsers}}>
            {children}
        </UserContext.Provider>
}

export default UserProvider;