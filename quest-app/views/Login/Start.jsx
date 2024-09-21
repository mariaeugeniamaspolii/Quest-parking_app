import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, useTheme } from 'react-native-paper';

import favoritosImg from '../../assets/images/favoritos.png';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const HomeScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");

                if (token) {
                    navigation.replace("Main");
                }
            } catch (err) {
                console.log("error message", err);
            }
        };
        checkLoginStatus();
    }, []);

    const navigateToOnboardingLocation = async () => {
        if (!email) {
            console.log('El campo de correo electrónico está vacío.');
            return;
        }

        try {
            const response = await fetch('http://192.168.31.239:3030/api/auth/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.status === 200) {
                console.log('Email ya está en uso');
                navigation.navigate('Login', { email });
            } else if (response.status === 404) {
                console.log('Email disponible');
                navigation.navigate('Register', { email });
            } else {
                console.error('Hubo un error al verificar el email:', response.statusText);
            }
        } catch (error) {
            console.error('Hubo un error al verificar el email:', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.tabContainer}>
            <Image style={styles.image} source={favoritosImg} />
            <Text style={[styles.text, { color: theme.colors.secondary }]}>¿Listo para ponerte en marcha? Inicia sesión y déjanos hacerte la vida más fácil.</Text>

            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <Text style={[styles.text, { color: theme.colors.secondary, marginTop: 32 }]}>Confirmaremos si ya tienes el email asociado a una cuenta existente</Text>

            <TouchableOpacity onPress={navigateToOnboardingLocation}>
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