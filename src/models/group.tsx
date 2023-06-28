export type Message = {
    content: string;
    sender: string;
    date: Date;
}

export type Group = {
    _id: string;
    participants: string[];
    messages: Message[];
}

export type GroupContextType = {
    groups: Group[];
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
    getGroups: any;
    // saveMessages: any;
}