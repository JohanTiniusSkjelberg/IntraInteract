import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./authContext";

export const ChatContext = createContext();


// eslint-disable-next-line react/prop-types
export const ChatContextProvider = ({ children }) => {
    const { authUser } = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId: null,
        user: {}
    }
    const chatReducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                return {
                    user: action.payload,
                    chatId: action.payload.uid > authUser.uid ? action.payload.uid + authUser.uid : authUser.uid + action.payload.uid
                }
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};