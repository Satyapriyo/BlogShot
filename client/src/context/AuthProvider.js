import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: null,
        isAuthenticated: false
    });
    
    return (
        <div>
            
        </div>
    )
}

export default AuthProvider
