import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, TextInput, useTheme } from 'react-native-paper'

const CTextInput = ({ label, value, mode, error, width="100%", Cstyle, onChangeText, onBlur, editable }) => {
    const [text, setText] = React.useState("");
    const theme = useTheme();

    return (
        <TextInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            mode='outlined'
            error={error}
            underlineColor='transparent'
            outlineColor={theme.colors.surfaceVariant}
            outlineStyle={{borderWidth: 1}}
            textColor={theme.colors.primary}
            labelTextColor={theme.colors.secondary}
            editable={editable}
            style={Cstyle}
        />
        // <BottomSheetTextInput type={type} placeholder={placeholder} style={[styles.input, { borderWidth: 1, borderColor: theme.colors.surfaceVariant, marginEnd: 12 }]} />

    );
};

export default CTextInput