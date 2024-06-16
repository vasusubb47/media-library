"use client";

import { 
    createContext, 
    useContext, 
    useState, 
    type Dispatch, 
    type SetStateAction 
} from 'react';

export type Auth = {
    id: string;
    name: string;
    email: string;
};

export type AuthContext = {
    auth: Auth | null;
    setAuth: Dispatch<SetStateAction<Auth | null>>;
}

export function useAuthContest(): AuthContext {
    const [auth, setAuth] = useState<Auth | null>(
        {
            id: "h", 
            name: "V",
            email: "V"
        }
    );
    // const [auth, setAuth] = useState<Auth | null>(null);
    const authContext = createContext<AuthContext>({auth, setAuth});

    return useContext(authContext);
}
