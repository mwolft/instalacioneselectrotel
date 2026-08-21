import React, { createContext, useReducer, useContext } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);


const initialState = {
    data: {
        casosExito: [],
        servicios: []
    },
    loading: false,
    error: null,
    fetched: {
        casosExito: false,
        servicios: false
    }
};

export function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    [action.payload.type]: action.payload.data
                },
                fetched: {
                    ...state.fetched,
                    [action.payload.type]: true
                }
            };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

// Default hook export for existing code that imports the hook as default
export default function useGlobalReducer() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalReducer must be used within a GlobalProvider');
    }
    return { store: context.state, dispatch: context.dispatch };
}

