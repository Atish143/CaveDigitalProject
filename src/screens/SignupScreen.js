import React, { useState , useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity ,  StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signup = async (name, email, password) => {
        try {
            const user = { name, email, password };
            await AsyncStorage.setItem('user', JSON.stringify(user));
            console.log('User registered:', user);
            Alert.alert(`${user.name}`,'have been registered proceed with login' )
            navigation.navigate('Login');
        } catch (error) {
            console.log('Signup Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#aaa"
                onChangeText={setName}
                value={name}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />

            <TouchableOpacity style={styles.button} onPress={() => signup(name, email, password)} >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#28a745',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 15,
        color: '#007BFF',
        fontSize: 14,
        textDecorationLine: 'underline',
    }
});

export default SignupScreen;

