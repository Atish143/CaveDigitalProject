import React, { useCallback , useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const TaskDetailsScreen = ({ route, navigation }) => {
    const { taskId } = route.params || {};

    const [task, setTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  useFocusEffect(
        useCallback(() => {
            setTask(null)
            setTitle('');
            setDescription('');
        }, [])
    );

    useEffect(() => {
        const loadTask = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem('tasks');
                const tasks = storedTasks ? JSON.parse(storedTasks) : [];

                const selectedTask = tasks.find(t => t.id === taskId);
                if (selectedTask) {
                    setTask(selectedTask);
                    setTitle(selectedTask.title);
                    setDescription(selectedTask.description);
                }
            } catch (error) {
                console.error('Error loading task:', error);
            }
        };

        loadTask();
    }, [taskId]);

    const handleUpdateTask = async () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Task title cannot be empty');
            return;
        }

        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            const tasks = storedTasks ? JSON.parse(storedTasks) : [];

            const updatedTasks = tasks.map(t =>
                t.id === taskId ? { ...t, title, description } : t
            );

            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            Alert.alert('Success', 'Task updated successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            const tasks = storedTasks ? JSON.parse(storedTasks) : [];

            const updatedTasks = tasks.filter(t => t.id !== taskId);
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

            Alert.alert('Success', 'Task deleted successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    if (!task) {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Task not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.heading}>Task Details</Text>

                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Task Title"
                />

                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Task Description"
                    multiline
                />

                <TouchableOpacity style={styles.updateButton} onPress={handleUpdateTask}>
                    <Text style={styles.buttonText}>Update Task</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTask}>
                    <Text style={styles.buttonText}>Delete Task</Text>
                </TouchableOpacity>
            </View>
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
    card: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    updateButton: {
        width: '100%',
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButton: {
        width: '100%',
        backgroundColor: '#e74c3c',
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

export default TaskDetailsScreen;
