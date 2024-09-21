import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme, Icon, Text } from 'react-native-paper';

import PropertiesScreen from '../views/Properties/PropertiesScreen';
import PropertiesResultsScreen from '../views/Properties/PropertiesResults';
import PropertyDetailScreen from '../views/Properties/PropertyDetail';

import SearchBar from '../components/SearchBar'
import Button from '../components/Button'
import ResultsBar from '../components/ResultsBar';

const forFade = ({ current, next }) => {
    const opacity = Animated.add(
        current.progress,
        next ? next.progress : 0
    ).interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
    });

    return {
        leftButtonStyle: { opacity },
        rightButtonStyle: { opacity },
        titleStyle: { opacity },
        backgroundStyle: { opacity },
    };
};

export const PropertiesTab = () => {
    const Stack = createStackNavigator();
    const theme = useTheme();


    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Properties"
                component={PropertiesScreen}
                options={{
                    headerStyle: { backgroundColor: theme.colors.primary },
                    header: () => (
                        <View style={{ backgroundColor: theme.colors.primary, paddingTop: 56, paddingLeft: 16, paddingRight: 16 }}>
                            <SearchBar placeholder="¿Dónde buscas?" LColor={theme.colors.primary} BgColor={theme.colors.background2} />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="PropertiesResults"
                component={PropertiesResultsScreen}
                options={{
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerStyleInterpolator: forFade,
                    header: () => (
                        <View style={{ backgroundColor: theme.colors.primary, paddingTop: 56, paddingLeft: 16, paddingRight: 16 }}>
                            <SearchBar placeholder="¿Dónde buscas?" LColor={theme.colors.primary} BgColor={theme.colors.background2} />
                            <ResultsBar />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="PropertyDetail"
                component={PropertyDetailScreen}
                title=''
                options={({ navigation }) => ({
                    headerStyle: { backgroundColor: 'transparent' },
                    headerTitle: '',
                    headerStyleInterpolator: forFade,
                    header: () => <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop:56 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'white', borderRadius: 20, padding: 16 }}>
                            <Icon
                                source="arrow-left"
                                color={theme.colors.primary}
                                size={16}
                                style={{ padding: 16 }}
                            />
                        </TouchableOpacity>
                    </View>,
                })}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({

    itemContainerR: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingVertical: 24,
        marginLeft: 'auto',
    },
    subtitle: {
        fontFamily: 'Lexend',
        marginLeft: 8,
    },

});


export default PropertiesTab;
