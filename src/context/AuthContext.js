import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const savedToken = await AsyncStorage.getItem('token');
                if (savedToken) {
                    setToken(savedToken);
                }
            } catch (error) {
                console.log('Error loading token:', error);
            }
        };
        loadToken();
    }, []);

    const generateRandomToken = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    };



    const login = async (email, password) => {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
                if (email === storedEmail && password === storedPassword) {
                    const randomToken = generateRandomToken();
                    await AsyncStorage.setItem('token', randomToken);
                    setToken(randomToken);
                    Alert.alert('Login successful.')
                    console.log('Login successful. Token:', randomToken);
                } else {
                    console.log('Invalid email or password');
                    Alert.alert('Invalid email or password')
                }
            } else {
                console.log('No user found. Please sign up.');
                Alert.alert('No user found. Please sign up.')
            }
        } catch (error) {
            console.log('Login Error:', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.clear();
            setToken(null);
            console.log('User logged out, token removed.');
        } catch (error) {
            console.log('Logout Error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
