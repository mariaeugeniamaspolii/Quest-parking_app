import React, { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import { Button } from 'react-native';
import { Camera } from 'react-native-maps';

const ClientAddressModel = () => {
    const [messagePermissions, setMessagePermissions] = useState('');
    const [position, setPosition] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync();

            if (foreground.granted) {
                startForegroundUpdate();
            }
        };

        requestPermissions();
    }, []);

    const startForegroundUpdate = async () => {
        const { granted } = await Location.getForegroundPermissionsAsync();

        if (!granted) {
            setMessagePermissions('Denegado');
            return;
        }

        const location = await Location.getLastKnownPositionAsync();
        if (location) {
            setPosition(location.coords);
            const newCamera = {
                center: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                zoom: 15,
                heading: 0,
                pitch: 0,
                altitude: 0
            };
            if (mapRef.current) {
                mapRef.current.animateCamera(newCamera, { duration: 2000 });
            }
        }
    };

    return (
        // Aquí puedes devolver los valores que necesites, como objetos, elementos JSX, etc.
        // Por ejemplo, podrías devolver un fragmento con los valores:
        <>
            {messagePermissions}
            {position}
            {mapRef}
        </>
    );
};

export default ClientAddressModel;
