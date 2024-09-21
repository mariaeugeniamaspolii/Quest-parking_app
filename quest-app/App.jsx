import React, { useState, useEffect } from 'react';
import { UserProvider } from './contexts/UserContext';

import { View, Button, Animated, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { configureFonts, DefaultTheme, MD3LightTheme, MD3DarkTheme, Text, useTheme, Provider as PaperProvider } from 'react-native-paper';
import { LightScheme } from './src/themes/LightScheme';

// import { typography } from './src/fonts/Typography';
// import BottomNav from './components/TabNav';

// import MaterialBottomNav from './components/MaterialTabNav';
// import StartStack from './views/Login/LoginStack';

import StackNavigator from './navigation/StackNavigator';

// TODO NOTE: APLICAR BIEN LAS TIPOGRAFÍAS
const fontConfig = {
    default: {
        fontFamily: 'Lexend'
    },
    bold: {
        fontFamily: 'LexendBold'
    },
    extraBold: {
        fontFamily: 'LexendExtraBold'
    },
    black: {
        fontFamily: 'LexendBlack'
    },
    bodyLarge: {
        fontFamily: 'Lexend'
    },
    bodyMedium: {
        fontFamily: 'Lexend'
    },
    bodySmall: {
        fontFamily: 'Lexend'
    },
    displayLarge: {
        fontFamily: 'Lexend'
    },
    displayMedium: {
        fontFamily: 'Lexend'
    },
    displaySmall: {
        fontFamily: 'Lexend'
    },
    headlineLarge: {
        fontFamily: 'Lexend'
    },
    headlineMedium: {
        fontFamily: 'Lexend'
    },
    headlineSmall: {
        fontFamily: 'Lexend'
    },
    labelLarge: {
        fontFamily: 'Lexend'
    },
    labelMedium: {
        fontFamily: 'Lexend'
    },
    labelSmall: {
        fontFamily: 'Lexend'
    },
    titleLarge: {
        fontFamily: 'Lexend'
    },
    titleMedium: {
        fontFamily: 'Lexend'
    },
    titleSmall: {
        fontFamily: 'Lexend'
    },
    // default: {
    //     fontFamily: 'Lexend'
    // },
    // default: {
    //     fontFamily: 'Lexend'
    // },
    // default: {
    //     fontFamily: 'Lexend'
    // },
    // default: {
    //     fontFamily: 'Lexend'
    // },
    // default: {
    //     fontFamily: 'Lexend'
    // },
    // default: {
    //     fontFamily: 'Lexend'
    // },
    // default: {
    //     fontFamily: 'Lexend'
    // },
    // default: {
    //     fontFamily: 'Lexend'
    // },

};

const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...LightScheme
    },
    fonts: configureFonts({ config: fontConfig })
};

const theme = LightTheme;

const customFonts = {
    Lexend: require('./src/fonts/Lexend.ttf'),
    LexendBold: require('./src/fonts/LexendBold.ttf'),
    LexendExtraBold: require('./src/fonts/LexendExtraBold.ttf'),
    LexendBlack: require('./src/fonts/LexendBlack.ttf'),
};

// function Home({ navigation }) {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Home screen</Text>
//             <Button
//                 title="Go to Profile"
//                 onPress={() => navigation.navigate('Profile', { propertyId: '1234' })}
//             />
//         </View>
//     );
// }

// function Profile({ navigation, route, ...props }) {
//     const { propertyId } = route.params;
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Profile screen</Text>
//             <Text>La propiedad a ampliar es {propertyId}</Text>
//             <Text>{JSON.stringify(props)}</Text>
//             <Button title="Go back" onPress={() => navigation.goBack()} />
//         </View>
//     );
// }

function App() {

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync(customFonts);
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            {/* <NavigationContainer> */}

            <PaperProvider theme={theme} style={[styles.container, { backgroundColor: theme.colors.primary }]}>
                <UserProvider>
                    {fontsLoaded ? (
                        <>
                            <StackNavigator />
                            {/* Renderiza el contenido dependiendo del estado del token
                            {userToken ? (
                                <MaterialBottomNav />
                            ) : (
                                <StartStack /> // Renderiza la pantalla de inicio de sesión si no hay token
                            )} */}
                        </>
                    ) : null}
                </UserProvider>
            </PaperProvider>

            {/* </NavigationContainer> */}
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 16,
        paddingRight: 16,
    },
});

export default App;