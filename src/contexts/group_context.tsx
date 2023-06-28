import React, { FC, createContext, useState } from 'react';
import { Group, GroupContextType } from '../models/group';
import getAxiosInstanceCustom from '../connection/axios_connection';

export const GroupContext = createContext<GroupContextType>({
    groups: [],
    setGroups: () => {},
    getGroups: () => {},
});

const GroupsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const data: Group[] = [];

    async function getGroups(): Promise<Group[]> {
        const response = await getAxiosInstanceCustom().get('/group');

        for(let i = 0; i < response.data.length; i++) {
            data[i] = response.data[i];
        }

        return data;
    }

    return <GroupContext.Provider value={{groups, setGroups, getGroups}}>
        {children}
    </GroupContext.Provider>
}

export default GroupsProvider;