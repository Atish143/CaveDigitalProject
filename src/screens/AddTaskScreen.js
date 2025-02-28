import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const AddTaskScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useFocusEffect(
        useCallback(() => {
            setTitle('');
            setDescription('');
        }, [])
    );

    const handleAddTask = async () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Please enter a task title');
            return;
        }
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            const tasks = storedTasks ? JSON.parse(storedTasks) : [];
            const highestId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0;
            const newTask = { id: highestId + 1, title, description };
            const updatedTasks = [...tasks, newTask];
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            Alert.alert('Success', 'Task added successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Task</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Task Title"
                value={title}
                onChangeText={setTitle}
            />
            
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Task Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        width: '100%',
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddTaskScreen;
