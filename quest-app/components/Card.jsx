import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

const MyComponent = ({ title, img, width, additionalStyles }) => {
    const theme = useTheme();

    const additionalStylesArray = Array.isArray(additionalStyles)
    ? additionalStyles
    : [additionalStyles];

    return (
        <Card style={[styles.container, { width: width },  ...additionalStylesArray ]}>
            <Card.Title title={title} style={styles.title} titleStyle={{ color:  theme.colors.background2, fontWeight: 'bold' }} />
            <Card.Cover source={img} style={{ resizeMode: 'cover', height: 156, width: '100%' }} />
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundSize: 'cover',
        width: '100%',
    },
    title: {
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 100,
        textTransform: 'capitalize',
    },
});

export default MyComponent;
