import React from 'react'
import { Text, useTheme } from 'react-native-paper'

const HeadingLarge = ({ text }) => {
    const theme = useTheme();

    return (
        <Text variant="headlineMedium" style={{ fontFamily: 'LexendBold', color: theme.colors.primary }}>{text}</Text>
    )
}

export default HeadingLarge