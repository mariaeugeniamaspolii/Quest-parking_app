import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Text, useTheme } from 'react-native-paper'

import UserScreen from '../views/User/UserScreen';
// import StartScreen from '../views/Login/Start';
// import LoginScreen from '../views/Login/Login';
// import RegisterScreen from '../views/Login/Register';
// import OnBLocationScreen from '../views/Login/OnBLocationScreen';
// import OnBNotificationScreen from '../views/Login/OnBNotificationScreen';
// import OnBWelcomeScreen from '../views/Login/OnBWelcomeScreen';

import HeadingLarge from '../components/HeadingLarge';

import { TouchableOpacity } from 'react-native-gesture-handler';

const forFadeAndSlideDown = ({ current, next }) => {
    const opacity = Animated.add(
        current.progress,
        next ? next.progress : 0.8
    ).interpolate({
        inputRange: [0, 0.5, 0.8, 1],
        outputRange: [0, 0.3, 0.8, 1],
    });

    return {
        cardStyle: {
            opacity,
            transform: [
                {
                    translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 10],
                    }),
                },
            ],
        },
        headerStyle: {
            opacity,
        },
    };
};


const UserTab = () => {
    const theme = useTheme();

    const Stack = createStackNavigator();
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.removeListener
        navigation.navigate('Home');
    };
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="User"
                component={UserScreen}
                // options={{
                //     headerTintColor: 'white',
                //     headerStyle: { backgroundColor: 'tomato' },
                // }}
                options={{
                    headerStyleInterpolator: forFadeAndSlideDown,
                    header: () => (
                        <View style={styles.container}>
                            <HeadingLarge text="Bienvenido" />
                        </View>
                    ),
                }}
            />
            {/* <Stack.Screen
                name="Start"
                component={StartScreen}
                // options={{
                //     headerTintColor: 'white',
                //     headerStyle: { backgroundColor: 'tomato' },
                // }}
                options={{
                    headerStyleInterpolator: forFadeAndSlideDown,
                    header: () => (
                        <View style={styles.container}>
                            <HeadingLarge text="Inicio y Registro" />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                // options={{
                //     headerTintColor: 'white',
                //     headerStyle: { backgroundColor: 'tomato' },
                // }}
                options={{
                    headerStyleInterpolator: forFadeAndSlideDown,
                    header: () => (
                        <View style={styles.container}>
                            <HeadingLarge text="Ingresa" />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                // options={{
                //     headerTintColor: 'white',
                //     headerStyle: { backgroundColor: 'tomato' },
                // }}
                options={{
                    headerStyleInterpolator: forFadeAndSlideDown,
                    header: () => (
                        <View style={styles.container}>
                            <HeadingLarge text="Registrate" />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Onboarding Location"
                component={OnBLocationScreen}
                options={{
                    headerStyleInterpolator: forFadeAndSlideDown,
                    header: () => (
                        <View style={[styles.container, styles.smallContainer]}>
                            <TouchableOpacity onPress={navigateToHome} style={{ borderBottomWidth: 1, borderColor: theme.colors.secondary, paddingBottom: 2 }}>
                                <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Omitir</Text>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Onboarding Notification"
                component={OnBNotificationScreen}
                options={{
                    headerStyleInterpolator: forFadeAndSlideDown,
                    header: () => (
                        <View style={[styles.container, styles.smallContainer]}>
                            <TouchableOpacity onPress={navigateToHome} style={{ borderBottomWidth: 1, borderColor: theme.colors.secondary, paddingBottom: 2 }}>
                                <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Omitir</Text>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Onboarding Welcome"
                component={OnBWelcomeScreen}
                options={{
                    headerStyleInterpolator: forFadeAndSlideDown,
                    header: () => (
                        <View style={[styles.container, styles.smallContainer]}>
                            <TouchableOpacity onPress={navigateToHome} style={{ borderBottomWidth: 1, borderColor: theme.colors.secondary, paddingBottom: 2 }}>
                                <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Omitir</Text>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            /> */}
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 56,
        paddingBottom: 24,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyItems: 'end',
        alignItems: 'flex-start'
    },
    smallContainer: {
        marginLeft: 'auto',
    },
});

export default UserTab;