import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

export function useUserLocation(options) {
    const [location, setLocation] = useState(null);
    const [watchPositionSubscription, setWatchPositionSubscription] = useState(null);

    const handleLocationChange = useCallback(
        function (e) {
            setLocation(e);
            if (options.onUserLocationChange) {
                options.onUserLocationChange({
                    nativeEvent: {
                        coordinate: {
                            ...e.coords,
                            timestamp: Date.now(),
                            altitude: e.coords.altitude || 0,
                            heading: e.coords.heading || 0,
                            accuracy: e.coords.accuracy || Location.Accuracy.Balanced,
                            isFromMockProvider: e.mocked || false,
                            speed: e.coords.speed || 0,
                        },
                    },
                });
            }
        },
        [options.onUserLocationChange]
    );

    useEffect(() => {
        Location.getForegroundPermissionsAsync().then(permission => {
            if (permission.granted && options.followUserLocation) {
                Location.getCurrentPositionAsync().then(handleLocationChange);
                // Watch position
                Location.watchPositionAsync(
                    { accuracy: Location.Accuracy.Balanced },
                    handleLocationChange
                ).then(subscription => {
                    setWatchPositionSubscription(subscription);
                });
            }
        });

        return () => {
            if (watchPositionSubscription) {
                watchPositionSubscription.remove();
            }
        };
    }, [options.followUserLocation]);

    return location;
}
F