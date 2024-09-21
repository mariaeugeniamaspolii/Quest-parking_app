import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import OnboardingScreen from '../../components/OnboardingScreen';
import Button from '../../components/Button';

import mapaImg from '../../assets/images/mapa.png';

const OnBLocation = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const navigateToNotification = () => {
        navigation.removeListener
        navigation.navigate('Onboarding Notification');
    };
    return (
        < OnboardingScreen
            img={mapaImg}
            title={'Encontrá un estacionamiento ideal para ti fácil y rápido'}
            text={'Activá tu ubicación para poder personalizar tu búsqueda según tu zona'}
            btn={<Button label='Siguiente' mode='outlined' bgColor='transparent' txColor={theme.colors.primary} font='Lexend' />
            }
            onPress={navigateToNotification} />
    );
};

export default OnBLocation;