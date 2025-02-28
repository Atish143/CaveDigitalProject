import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            setTasks(storedTasks ? JSON.parse(storedTasks) : []);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadTasks();
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Task List</Text>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
                        style={styles.taskItem}
                    >
                        <Text style={styles.taskTitle}>{item.title}</Text>
                        <Text style={styles.taskDescription}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />

   
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop:30
    },
    taskItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskDescription: {
        color: 'gray',
    },
});

export default HomeScreen;
