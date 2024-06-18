import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import api from './api';
import { User } from './User';

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createUser = async () => {
        try {
            const response = await api.post('/users', { name, email });
            setUsers([...users, response.data]);
            setName('');
            setEmail('');
        } catch (error) {
            console.error(error);
        }
    };

    const updateUser = async () => {
        if (editingUser) {
            try {
                const response = await api.put(`/users/${editingUser.id}`, { name, email });
                setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
                setName('');
                setEmail('');
                setEditingUser(null);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const deleteUser = async (id: number) => {
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const startEditUser = (user: User) => {
        setName(user.name);
        setEmail(user.email);
        setEditingUser(user);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button
                title={editingUser ? "Update User" : "Create User"}
                onPress={editingUser ? updateUser : createUser}
            />
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userContainer}>
                        <Text>{item.name}</Text>
                        <Text>{item.email}</Text>
                        <Button title="Edit" onPress={() => startEditUser(item)} />
                        <Button title="Delete" onPress={() => deleteUser(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});

export default UserList;