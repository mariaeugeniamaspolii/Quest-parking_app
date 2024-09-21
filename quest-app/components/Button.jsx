import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const CButton = ({
    label,
    icon = "",
    bgColor = "#1150F3",
    txColor = "#fff",
    mode = "contained",
    onPress,
    compact = true,
    style,
    Bstyle="large",
    font = 'LexendBold' }) => {

    const btnLarge = {
        padding: 16,
    }
    const btnSmall = {
        padding: 8,
        alignSelf: 'flex-start', 
        minWidth: 'auto',
    }

    const appliedStyle = Bstyle === "large" ? btnLarge : btnSmall;

    return (
        <Button style={[appliedStyle, style]}
            icon={icon}
            mode={mode}
            onPress={onPress}
            buttonColor={bgColor}
            textColor={txColor}
            outlineColor={txColor}
            compact={compact}
            labelStyle={{ fontFamily: font, fontSize: 16, marginTop: 0, marginBottom: 0 }}
        >
            {label}
        </Button >
    );
}
const styles = StyleSheet.create({
    btnSmall: {
        padding: 0
    },
    btnLarge: {
        padding: 8,
        alignSelf: 'flex-start', minWidth: 'auto',
    },
});
export default CButton;
