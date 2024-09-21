import React, { useMemo, forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';

const CustomBottomSheet = forwardRef(({ index, content, enablePanDownToClose=true, snaps=['30%', '98%'], ...props }, ref) => {
    const theme = useTheme();

    const snapPoints = useMemo(() => snaps, []);

    return (
        <BottomSheet
            style={styles.bottomSheet}
            ref={ref}
            snapPoints={snapPoints}
            index={index}
            enablePanDownToClose={enablePanDownToClose}
            handleIndicatorStyle={{ backgroundColor: theme.colors.surfaceVariant, width: 50 }}
        >
            {content}
        </BottomSheet>
    );
});

const styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        zIndex: 1000,
        padding: 16,
        paddingTop: 4,
        paddingBottom: 0,
    },
});

export default CustomBottomSheet;
