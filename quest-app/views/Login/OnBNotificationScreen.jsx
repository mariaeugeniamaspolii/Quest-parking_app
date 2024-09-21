import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import OnboardingScreen from '../../components/OnboardingScreen';
import Button from '../../components/Button';

import reservasImg from '../../assets/images/reservas.png';

const OnBNotification = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const navigateToWelcome = () => {
        navigation.removeListener
        navigation.navigate('Onboarding Welcome');
    };
    return (
        < OnboardingScreen
            img={reservasImg}
            title={'Reservá tu estacionamiento tarifado y recibe avisos'}
            text={'Activá tus notificaciones para enterarte cuando te queda poco tiempo de reserva'}
            btn={<Button label='Siguiente' mode='outlined' bgColor='transparent' txColor={theme.colors.primary} font='Lexend' />
            }
            onPress={navigateToWelcome} />
    );
};

export default OnBNotification;