import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, useTheme } from 'react-native-paper';

import favoritosImg from '../../assets/images/favoritos.png';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Snackbar from '../../components/Snackbar';



const RegisterScreen = ({ route }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('error'); // Nuevo estado para el tipo de Snackbar
    const [snackbarText, setSnackbarText] = useState('Todos los campos son necesarios'); // Nuevo estado para el tipo de Snackbar

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    useEffect(() => {
        if (route.params?.email) {
            setEmail(route.params.email);
        }
    }, [route.params?.email]);

    const registerUser = async () => {

        
        if (email.trim() !== '' && password.trim() !== '' && name.trim() !== '' && additionalInfo.trim() !== '') {
        }
        
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        console.log('Cuerpo de la solicitud a la API:', JSON.stringify({ name, email, password, additionalInfo }));
        console.log('trimed:', JSON.stringify({ trimmedName, trimmedEmail, trimmedPassword, additionalInfo }));

        try {
            const response = await fetch('http://192.168.31.239:3030/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  name: trimmedName, email: trimmedEmail, password: trimmedPassword, additionalInfo }),
            });

            const data = await response.json();

            if (response.status === 201) {
                navigation.navigate('Onboarding Location')
                const loginResponse = await fetch('http://192.168.31.239:3030/api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const loginData = await loginResponse.json();
                const token = loginData.token;

                if (loginResponse.status === 200) {
                    await AsyncStorage.setItem('userToken', token);
                    navigation.navigate('Onboarding Location');
                    setSnackbarText('Bienvenido');
                } else {
                    console.error('Error al iniciar sesión después del registro:', loginData);
                }
            } else if (response.status === 400) {
                console.log('response.status: ', response.status);
                navigation.navigate('Login', email);
            } else {
                console.log('response.status: ', response.status);
                setShowSnackbar(true);
                navigation.navigate('Register');
                setSnackbarText('Todos los campos son necesarios')
            }
        } catch (error) {
            console.error('Hubo un error register:', error.message);
        }
    };

    return (
        <View>

            <ScrollView contentContainerStyle={styles.tabContainer}>
                <Image style={styles.image} source={favoritosImg} />
                <Text style={[styles.text, { color: theme.colors.secondary }]}>¿Listo para ponerte en marcha? Inicia sesión y déjanos hacerte la vida más facil.</Text>

                < TextInput
                    label="Nombre"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <View style={{ marginTop: 8 }} >
                    < TextInput
                        label="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>


                <View style={{ marginTop: 8 }} >
                    < TextInput
                        label="Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <View style={{ marginTop: 8 }} >
                    < TextInput
                        label="Adicional"
                        value={additionalInfo}
                        onChangeText={(text) => setAdditionalInfo(text)}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
                    {/* <Text style={{color: theme.colors.secondary}}>Mantenerme loggeado</Text> */}
                </View>
                <Text style={[styles.text, { color: theme.colors.secondary, marginTop: 32 }]}>¡Nos alegra que te unas a la red más grande de parkings!</Text>
                <TouchableOpacity onPress={registerUser}>
                    <Button label='Crear perfil' style={{ width: '100%' }} />
                </TouchableOpacity>
                <View style={styles.dividerContainer}>
                    <View style={[styles.divider, { backgroundColor: theme.colors.surfaceVariant }]}>
                    </View>
                    <Text style={{ color: theme.colors.secondary, }}>o</Text>
                    <View style={[styles.divider, { backgroundColor: theme.colors.surfaceVariant }]}>
                    </View>
                </View>

                <TouchableOpacity style={styles.socialButtons}>
                    <Button label='Continuar con el número de celular' mode='outlined' bgColor='transparent' txColor={theme.colors.primary} icon='cellphone' font='Lexend' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButtons}>
                    <Button label='Continuar con Google' mode='outlined' bgColor='transparent' txColor={theme.colors.primary} icon='google' font='Lexend' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButtons}>
                    <Button label='Continuar con Facebook' mode='outlined' bgColor='transparent' txColor={theme.colors.primary} icon='facebook' font='Lexend' />
                </TouchableOpacity>
            </ScrollView>

            <View style={[{ position: 'relative' }]}>
                <Snackbar
                    visible={showSnackbar}
                    text={snackbarText}
                    BgColor={snackbarType === 'error' ? theme.colors.error : theme.colors.success}
                    onDismiss={() => setShowSnackbar(false)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexGrow: 1,
        fontFamily: 'Lexend',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    image: {
        width: '100%',
        height: 190,
        borderRadius: 12,
        marginRight: 16,
    },
    text: {
        marginVertical: 16
    },
    dividerContainer: {
        flexDirection: 'row',
        marginVertical: 32,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    divider: {
        width: '40%',
        height: 1,
    },
    socialButtons: {
        width: '100%',
        marginBottom: 16,
    },
});
export default RegisterScreen;