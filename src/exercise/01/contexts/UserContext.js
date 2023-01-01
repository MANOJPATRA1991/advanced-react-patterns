import * as React from 'react';
import { useAuth } from '../../../auth-context';
import userReducer from '../reducers/userReducer';

const UserContext = React.createContext();
UserContext.displayName = 'UserContext';

function UserProvider({ children }) {
    const { user } = useAuth();
    const userInitialState = {
        status: null,
        error: null,
        storedUser: user,
        user,
    };
    const [state, dispatch] = React.useReducer(userReducer, userInitialState);
    const value = [state, dispatch];
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserProvider`);
    }
    return context;
}

export { UserProvider, useUser };
