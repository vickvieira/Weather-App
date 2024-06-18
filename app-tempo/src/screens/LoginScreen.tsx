import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }:any) => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.70.124:8080/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, senha })
            });

            const data = await response.json();

            if (response.ok && data === 'Autenticado') {
                navigation.navigate('Home');
            } else {
                Alert.alert('Erro', 'Credenciais inválidas');
            }
        } catch (error) {
            console.error('Erro ao tentar realizar o login:', error.message);
            Alert.alert('Erro', 'Erro ao tentar realizar o login');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Login"
                value={login}
                onChangeText={setLogin}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Cadastro" onPress={() => navigation.navigate('Cadastro')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;
