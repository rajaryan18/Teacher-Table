import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
    const [_class, setClass] = useState(null);
    const [token, setToken] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [tokenExpiration, setTokenExpiration] = useState();

    const login = useCallback((c, token, expirationDate) => {
        //checking for admin in url
        if(window.location.pathname.split("/").findIndex((x) => x === 'admin') > 0) {
            setAdmin(true);
        }
        setToken(token);
        setClass(c);
        const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 4); //4 hours
        setTokenExpiration(tokenExpiration);
        localStorage.setItem(
            'userData',
            JSON.stringify({
              section: c,
              token: token,
              expiration: tokenExpiration.toISOString()
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setClass(null);
        setTokenExpiration(null);
        setAdmin(false);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (token && tokenExpiration) {
            const remainingTime = tokenExpiration.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
          } else {
            clearTimeout(logoutTimer);
          }
    }, [token, login, tokenExpiration])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if(storedData && storedData.token && (new Date(storedData.expiration) > new Date())) {
            login(storedData.section, storedData.token, new Date(storedData.expiration));
        }
    }, [login]);
    
    return { admin, token, _class, login, logout };
};