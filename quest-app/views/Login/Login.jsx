import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, useTheme } from 'react-native-paper';

import favoritosImg from '../../assets/images/favoritos.png';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Snackbar from '../../components/Snackbar'


const HomeScreen = ({ route }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('error'); // Nuevo estado para el tipo de Snackbar
    const [snackbarText, setSnackbarText] = useState('Todos los campos son necesarios'); // Nuevo estado para el tipo de Snackbar

    useEffect(() => {
        if (route.params?.showSnackbar || route.params?.snackbarType || route.params?.snackbarText) {
            setShowSnackbar(true);
            setSnackbarType(route.params.snackbarType);
            setSnackbarText(route.params.snackbarText);
        }
    }, [route.params?.showSuccessSnackbar]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (route.params?.email) {
            setEmail(route.params.email);
        }
    }, [route.params?.email]);

    const LoginUser = async () => {
        if (email.trim() !== '' && password.trim() !== '') {
        }

        try {
            const response = await fetch('http://192.168.31.239:3030/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('data: ', data.token);
            const token = data.token;

            if (response.status === 200) {
                await AsyncStorage.setItem('userToken', token);
                navigation.navigate('Onboarding Location')
                setSnackbarText('Bienvenido')

            } else if (response.status === 401) {
                setShowSnackbar(true)
                setSnackbarText('Contraseña incorrecta')
                navigation.navigate('Login');

            } else if (response.status === 400) {
                setShowSnackbar(true);
                navigation.navigate('Login');
                
            } else {
                console.error('Error al registrar el usuario:', data);
            }
        } catch (error) {
            console.error('Hubo un error login:', error.message);
        }
    };

    return (
        <View>

            <ScrollView contentContainerStyle={styles.tabContainer}>
                <Image style={styles.image} source={favoritosImg} />
                <Text style={[styles.text, { color: theme.colors.secondary }]}>¿Listo para ponerte en marcha? Inicia sesión y déjanos hacerte la vida más facil.</Text>

                < TextInput
                    label="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    editable={false}
                />

                <View style={{ marginTop: 16 }} >
                    < TextInput
                        label="Contraseña"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
                    {/* <Text style={{color: theme.colors.secondary}}>Mantenerme loggeado</Text> */}
                    {/* <Text  style={{color: theme.colors.secondary, fontFamily:'LexendBold'}}>Olvidé mi contraseña</Text> */}
                </View>
                <Text style={[styles.text, { color: theme.colors.secondary, marginTop: 32 }]}>¡Que gusto volverte a encontrar!</Text>
                <TouchableOpacity onPress={LoginUser}>
                    <Button label='Ingresar' style={{ width: '100%' }} />
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
export default HomeScreen;