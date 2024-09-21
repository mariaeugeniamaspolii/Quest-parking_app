import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar, Text, useTheme } from 'react-native-paper';

const CSnackbar = ({ text, visible, onDismiss, BgColor }) => {
    const theme = useTheme();

    return (
            <Snackbar
                visible={visible}
                onDismiss={onDismiss}
                duration={3000}
                // action={{
                //     label: 'Cerrar',
                //     color: "#FFF",
                //     onPress: () => {
                //         visible = false
                //     },
                // }}
                style={{
                    backgroundColor: BgColor,
                    justifyContent: 'center',
                    paddingBottom: 0
                }}
            >
                <Text style={{ color: theme.colors.text1, textAlign: 'center', paddingBottom: 0 }}>
                    {text}
                </Text>
            </Snackbar>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default CSnackbar;
