import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const CadastroScreen = ({ navigation }:any) => {
    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');

    const handleCadastro = async () => {
        try {
            const response = await fetch('http://192.168.70.124:8080/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, login, senha, email })
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
                navigation.navigate('Login');
            } else {
                const errorData = await response.json();
                console.error('Erro ao tentar cadastrar o usuário:', errorData);
                Alert.alert('Erro', 'Erro ao tentar cadastrar o usuário');
            }
        } catch (error) {
            console.error('Erro ao tentar cadastrar o usuário:', error.message);
            Alert.alert('Erro', 'Erro ao tentar cadastrar o usuário');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
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
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Cadastrar" onPress={handleCadastro} />
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

export default CadastroScreen;
