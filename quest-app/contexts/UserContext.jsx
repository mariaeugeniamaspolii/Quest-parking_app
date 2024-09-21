import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // FETCH USER
    const fetchUserData = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');

            const headers = {
                'Content-Type': 'application/json',
                'x-access-token': userToken,
            };
        
            const response = await fetch('http://192.168.31.239:3030/api/user', {
                method: 'GET',
                headers: headers,
            });
    
            const userData = await response.json();
    
            if (response.status === 200) {
                console.log('Detalles del usuario:', userData);
                setUser(userData);
            } else {
                console.error('Error al obtener los detalles del usuario:', userData);
            }
        } catch (error) {
            console.error('Hubo un error al obtener los detalles del usuario:', error.message);
        }
    };
    
    // LOGOUT
    const logout = async () => {
        try {
            setUser(null);
            await AsyncStorage.removeItem('userToken');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);
    
    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe usarse dentro de un UserProvider');
    }
    return context;
};
