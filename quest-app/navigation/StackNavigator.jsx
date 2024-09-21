import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useEffect, useState } from "react";

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme, DefaultTheme, MD3DarkTheme } from 'react-native-paper';

import HomeTab from '../tabs/Home';
import MeteredTab from '../tabs/Metered';
import PropertiesTab from '../tabs/Properties';
import AdminTab from '../tabs/Admin';
import UserTab from '../tabs/User';

import StartScreen from '../views/Login/Start';
import LoginScreen from '../views/Login/Login';
import RegisterScreen from '../views/Login/Register';
import OnBLocationScreen from '../views/Login/OnBLocationScreen';
import OnBNotificationScreen from '../views/Login/OnBWelcomeScreen';
import OnBWelcomeScreen from '../views/Login/OnBWelcomeScreen';
import UserScreen from '../views/User/UserScreen';

import HeadingLarge from '../components/HeadingLarge';

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

const StackNavigator = () => {
    const theme = useTheme();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setIsAuthenticated(!!token); // Si existe el token, el usuario está autenticado
            } catch (err) {
                console.log('Error al verificar el estado de inicio de sesión:', err);
            }
        };
        checkLoginStatus();
    }, []);

    const Tab = createMaterialBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    function BottomTabs() {
        return (
            <Tab.Navigator
                barStyle={{
                    backgroundColor: theme.colors.tertiary,
                    borderTopLeftRadius: 20,
                    position: 'relative',
                    // bottom: -24
                    height: 100,
                }}
                activeColor={theme.colors.background2}
                inactiveColor={theme.colors.secondary}
                labeled={true}
            >
                <Tab.Screen name="Inicio" component={HomeTab}
                    options={{
                        tabBarIcon: 'home-outline',
                        tabBarLabel: 'Inicio',
                    }}
                />
                <Tab.Screen name="MeteredTab" component={MeteredTab}
                    options={{
                        tabBarIcon: 'alarm',
                        tabBarLabel: 'Tarifado',
                    }}
                />
                <Tab.Screen name="Propiedades" component={PropertiesTab}
                    options={{
                        tabBarIcon: 'warehouse',
                        tabBarLabel: 'Propiedades',
                    }}
                />
                <Tab.Screen name="Admin" component={AdminTab}
                    options={{
                        tabBarIcon: 'tag-outline',
                        tabBarLabel: 'Admin',
                    }}
                />
                <Tab.Screen name="Usuario" component={UserTab}
                    options={{
                        tabBarIcon: 'account-outline',
                        tabBarLabel: 'Usuario',
                    }}
                />
            </Tab.Navigator>
        );
    }
    function RenderScreens() {
        if (isAuthenticated) {
            return <BottomTabs />;
        } else {
            return (
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Start"
                            component={StartScreen}
                            // options={{
                            //     headerTintColor: 'white',
                            //     headerStyle: { backgroundColor: 'tomato' },
                            // }}
                            options={{
                                headerStyleInterpolator: forFadeAndSlideDown,
                                header: () => (
                                    <View style={styles.loginContainer}>
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
                                    <View style={styles.loginContainer}>
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
                                    <View style={styles.loginContainer}>
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
                                    <View style={[styles.loginContainer, styles.smallContainer]}>
                                        {/* <TouchableOpacity onPress={navigateToHome} style={{ borderBottomWidth: 1, borderColor: theme.colors.secondary, paddingBottom: 2 }}>
                                    <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Omitir</Text>
                                </TouchableOpacity> */}
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
                                    <View style={[styles.loginContainer, styles.smallContainer]}>
                                        {/* <TouchableOpacity onPress={navigateToHome} style={{ borderBottomWidth: 1, borderColor: theme.colors.secondary, paddingBottom: 2 }}>
                                    <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Omitir</Text>
                                </TouchableOpacity> */}
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
                                    <View style={[styles.loginContainer, styles.smallContainer]}>
                                        {/* <TouchableOpacity onPress={navigateToHome} style={{ borderBottomWidth: 1, borderColor: theme.colors.secondary, paddingBottom: 2 }}>
                                    <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Omitir</Text>
                                </TouchableOpacity> */}
                                    </View>
                                ),
                            }}
                        />

                        <Stack.Screen
                            name="Main"
                            component={BottomTabs}
                            options={{
                                headerStyleInterpolator: forFadeAndSlideDown,
                                header: () => (
                                    <View style={[styles.container, styles.smallContainer]}>
                                        {/* <TouchableOpacity onPress={navigateToHome} style={{ borderBottomWidth: 1, borderColor: theme.colors.secondary, paddingBottom: 2 }}>
                                    <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Omitir</Text>
                                </TouchableOpacity> */}
                                    </View>
                                ),
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }
    }

    return <RenderScreens />;
};

        const styles = StyleSheet.create({
            loginContainer: {
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

        export default StackNavigator;
