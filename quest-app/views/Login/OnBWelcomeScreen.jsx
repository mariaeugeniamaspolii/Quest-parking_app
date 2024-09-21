import React from 'react';
import { ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Text, useTheme } from 'react-native-paper';

import OnboardingScreen from '../../components/OnboardingScreen';
import Button from '../../components/Button';

import proximidadImg from '../../assets/images/proximidad.png';

const OnBWelcome = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.replace("Main")
    };

    return (
        < OnboardingScreen
            img={proximidadImg}
            title={'Publicá tus estacionamientos para alquilarlos o venderlos'}
            text={'Sumate a la red más grande de estacionamientos y maneja tus estacionamientos de forma sencilla'}
            btn={<Button label='Comenzar' />
            }
            onPress={navigateToHome} />
    );
};

export default OnBWelcome;