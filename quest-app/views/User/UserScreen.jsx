import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde '@react-navigation/native'

import Button from '../../components/Button';
import { Text, useTheme, List, Icon } from 'react-native-paper';

import { useUser } from '../../contexts/UserContext';

const HomeScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const { user, setUserName } = useUser();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            navigation.navigate('Start');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <ScrollView style={styles.tabContainer}>
            <View>
                <Text variant="titleLarge" style={{color: theme.colors.primary}}>{user.user.name}</Text>
                <Text variant="bodyLarge" style={{color: theme.colors.primary, marginTop: 24, marginBottom: 16}}>Perfil</Text>
                <List.AccordionGroup style={{ marginVertical: 20, backgroundColor: theme.colors.background2 }}>
                    <List.Accordion theme={{colors: {background: theme.colors.background2}}} style={{ backgroundColor: 'transparent'}} titleStyle={{ color: theme.colors.secondary}} title="Subscripción" id="1" left={props => <List.Icon {...props} icon="ticket-outline" />}>
                        <List.Item title="Item 1" />
                    </List.Accordion>
                    <List.Accordion theme={{colors: {background: theme.colors.background2}}} style={{ backgroundColor: 'transparent'}} titleStyle={{ color: theme.colors.secondary}} title="Mensajes" id="2" left={props => <List.Icon {...props} icon="email-outline" />}>
                        <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 24, padding: 16 }}>
                        </View>
                    </List.Accordion>
                    <List.Accordion theme={{colors: {background: theme.colors.background2}}} style={{ backgroundColor: 'transparent'}} titleStyle={{ color: theme.colors.secondary}} title="Métodos de pago" id="3" left={props => <List.Icon {...props} icon="credit-card-outline" />}>
                        <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 24, padding: 16 }}>
                        </View>
                    </List.Accordion>
                    <List.Accordion theme={{colors: {background: theme.colors.background2}}} style={{ backgroundColor: 'transparent'}} titleStyle={{ color: theme.colors.secondary}} title="Alertas/ Notificaciones" id="3" left={props => <List.Icon {...props} icon="bell-outline" />}>
                        <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 24, padding: 16 }}>
                        </View>
                    </List.Accordion>
                </List.AccordionGroup>
                <Text variant="bodyLarge" style={{color: theme.colors.primary, marginTop: 24, marginBottom: 16}}>En propiedad</Text>
                <List.AccordionGroup >
                    <List.Accordion theme={{colors: {background: theme.colors.background2}}} style={{ backgroundColor: 'transparent'}} titleStyle={{ color: theme.colors.secondary}} title="Propiedades" id="1" left={props => <List.Icon {...props} icon="home-outline" />}>
                        <List.Item title="Item 1" />
                    </List.Accordion>
                    <List.Accordion theme={{colors: {background: theme.colors.background2}}} style={{ backgroundColor: 'transparent'}} titleStyle={{ color: theme.colors.secondary}} title="Vehículos" id="2" left={props => <List.Icon {...props} icon="car-outline" />}>
                        <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 24, padding: 16 }}>
                        </View>
                    </List.Accordion>
                </List.AccordionGroup>
                <TouchableOpacity onPress={handleLogout} style={{marginTop: 24}}>
                    <Button label="Cerrar sesión" bgColor={theme.colors.error} mode="contained" Bstyle="small" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        padding: 16,
    },
});

export default HomeScreen;
