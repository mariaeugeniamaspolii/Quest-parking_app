import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';

const HorizontalSwiper = ({ array }) => {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {array.map((url, index) => (
                    <View style={styles.container} key={index}>
                        <Image source={{ uri: url }} style={styles.image} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        marginEnd: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
});

export default HorizontalSwiper;
