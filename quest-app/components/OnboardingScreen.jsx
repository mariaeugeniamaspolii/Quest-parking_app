import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

const OnboardingScreen = ({ img, title, text, btn, onPress }) => {
    const theme = useTheme();

    return (
        <View style={styles.tabContainer}>
            <Image style={styles.image} source={img} />
            <Text variant='titleLarge' style={[styles.text, { color: theme.colors.secondary, fontFamily: 'LexendBold', fontSize: 20 }]}>
                {title}
            </Text>
            <Text style={{ color: theme.colors.secondary }}>
                {text}
            </Text>
            <TouchableOpacity style={styles.mainBtn} onPress={onPress}>
                {btn}
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        flexGrow: 1,
        fontFamily: 'Lexend',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    image: {
        width: '100%',
        height: 468,
        borderRadius: 12,
        marginRight: 16,
    },
    text: {
        marginTop: 16,
        marginBottom: 8
    },
    mainBtn: {
        width: '100%',
        marginTop: 16,
        position: 'absolute',
        bottom: 16,
        left: 16,
    },
});

export default OnboardingScreen
