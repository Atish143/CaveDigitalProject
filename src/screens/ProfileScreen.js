import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Profile</Text>

            {user ? (
                <View style={styles.profileCard}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{user.name || 'N/A'}</Text>

                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{user.email || 'N/A'}</Text>
                </View>
            ) : (
                <Text style={styles.loadingText}>Loading user data...</Text>
            )}

            <Button title="Logout" onPress={logout} color="#d9534f" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    profileCard: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 5,
    },
    value: {
        fontSize: 18,
        color: '#333',
        marginBottom: 15,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
    },
});

export default ProfileScreen;
