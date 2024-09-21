import * as React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';

const MyComponent = () => {

    const theme = useTheme();

    return (
        <ActivityIndicator animating={true} color={theme.colors.primary} />
    )
}

export default MyComponent;