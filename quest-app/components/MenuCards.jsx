// Componente MyComponent.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import Card from '../components/Card';


import reservasImg from '../assets/images/reservas.png';
import mapaImg from '../assets/images/mapa.png';
import favoritosImg from '../assets/images/favoritos.png';
import proximidadImg from '../assets/images/proximidad.png';

const MenuCards = () => {
    const theme = useTheme();

    return (
        <View style={styles.cardContainer}>
            <Card title="reservas" img={reservasImg} width="47%" additionalStyles={styles.card} />
            <Card title="mapa" img={mapaImg} width="47%" additionalStyles={styles.cardeven} />
            <Card title="favoritos" img={favoritosImg} width="47%" additionalStyles={styles.card} />
            <Card title="proximidad" img={proximidadImg} width="47%" additionalStyles={styles.cardeven} />
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 16,
    },
    card: {
        marginBottom: 16,
        marginRight: 16,
    },
    cardeven: {
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});


export default MenuCards;
