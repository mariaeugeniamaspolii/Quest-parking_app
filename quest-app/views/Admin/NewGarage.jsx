import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import HeadingLarge from '../../components/HeadingLarge';
import Snackbar from '../../components/Snackbar';
import Loader from "../../components/Loader";


import { useUser } from '../../contexts/UserContext';

import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../config';
// import 'firebase/compat/storage';
import * as FileSystem from 'expo-file-system';

const apiToJson = (rawRes) => {
    return rawRes.json();
};

const CreateParkingForm = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('error');
    const [loading, setLoading] = useState(false);

    const { user } = useUser();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [slots, setSlots] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [hourPrice, setHourPrice] = useState('');
    const [dayPrice, setDayPrice] = useState('');
    const [monthPrice, setMonthPrice] = useState('');

    const [selectedImages, setSelectedImages] = useState([]);

    // const [images, setImages] = useState([]); // Array to store selected images
    const [uploading, setUploading] = useState(false); // Array to store selected images

    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            multiple: true, // Enable multiple selection
        });

        if (!result.canceled) {
            setSelectedImages([...selectedImages, ...result.assets.map(asset => asset.uri)]);
        }
    };

    const uploadMedia = async () => {
        setLoading(true);
        try {
            const uploadPromises = selectedImages.map(async (imageUri) => {
                const { uri } = await FileSystem.getInfoAsync(imageUri);
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => resolve(xhr.response);
                    xhr.onerror = (e) => reject(new TypeError('Network request failed'));
                    xhr.responseType = 'blob';
                    xhr.open('GET', uri, true);
                    xhr.send(null);
                });

                const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
                const ref = firebase.storage().ref().child(filename);
                await ref.put(blob);

                // Obtener la URL de descarga de la imagen cargada en Firebase Storage
                const downloadURL = await ref.getDownloadURL();
                return downloadURL;
            });

            // Esperar a que todas las imágenes se suban y obtener sus URL de descarga
            const uploadedImageUrls = await Promise.all(uploadPromises);

            // Almacenar las URL en el estado o donde desees utilizarlas
            // En este caso, actualiza el estado o almacena las URL como necesites
            console.log('URLs de imágenes subidas:', uploadedImageUrls);

            // Ahora que tienes las URL, puedes usarlas en newParkingData.images
            // Ejemplo: newParkingData.images = uploadedImageUrls;

            setLoading(false);
            return uploadedImageUrls;
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleCreateParking = async () => {

        if (!name || !address || !slots || !length || !width || !height || !hourPrice || !dayPrice || !monthPrice) {
            setShowSnackbar(true);
            setSnackbarType('error');
            return;
        }

        let uploadedImageUrls = []; // Declara una variable para almacenar las URL

        if (selectedImages) {
            uploadedImageUrls = await uploadMedia(); // Obtiene las URL de las imágenes subidas
        }

        const newParkingData = {
            name: name,
            address: {
                name: address,
            },
            slots: slots,

            dimensions: {
                length: length,
                width: width,
                height: height,
            },

            hourPrice: hourPrice,
            dayPrice: dayPrice,
            monthPrice: monthPrice,
            images: uploadedImageUrls,
            owner: user.user._id,
        };


        fetch("http://192.168.31.239:3030/api/parkings", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newParkingData)
        })
            .then(apiToJson)
            .then((apiJson) => {
                if (apiJson.status === 500) {
                    console.log('No creado:', newParkingData);

                } else {
                    console.log('Nuevo estacionamiento creado:', newParkingData);
                    setName('');
                    setAddress('');
                    setSlots('');

                    setLength('');
                    setWidth('');
                    setHeight('');

                    setHourPrice('');
                    setDayPrice('');
                    setMonthPrice('');

                    setSnackbarType('success');
                    setShowSnackbar(true);

                    navigation.navigate('Garages', { showSuccessSnackbar: true });
                }
            }
            )
            .catch((error) => {
                console.log("Falló debido a un error", error)
            })
    };

    return (
        <View style={[styles.tabContainer, { height: '100%' }]}>

            <ScrollView style={{ height: '120%' }}>
                <HeadingLarge text="Nuevo parking" />
                <Text variant="" style={[{ color: theme.colors.secondary, marginTop: 8 }]}>Demuestra todo el potencial que tiene por lo cual elegirte es la mejor opción.</Text>
                <Text variant="" style={[styles.labels, { color: theme.colors.primary }]}>Datos generales del parking</Text>
                <TextInput label="Nombre" onChangeText={(text) => setName(text)} value={name} Cstyle={{ marginBottom: 4 }} />
                < TextInput label="Dirección" value={address} onChangeText={setAddress} Cstyle={{ marginBottom: 4 }} />
                < TextInput label="Cupos" value={slots} onChangeText={setSlots} Cstyle={{ width: 100 }} />

                <Text variant="" style={[styles.labels, { color: theme.colors.primary }]}>Imágenes</Text>
                <View style={{ backgroundColor: theme.colors.surfaceVariant, flex: 1, borderRadius: 8, minHeight: 100, padding: 16 }}>

                    <SafeAreaView style={styles.imageInput}>
                        {loading ? (
                            <View>
                                <Loader />
                            </View>
                        ) : (
                            <>
                                <View style={styles.imageContainer}>
                                    {selectedImages.map((image, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: image }}
                                            style={{ width: 100, height: 100, margin: 5 }}
                                        />
                                    ))}
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.selectButton} onPress={pickImages}>
                                        <Button
                                            label="Seleccionar imágenes"
                                            icon="image"
                                            bgColor="white"
                                            txColor={theme.colors.secondary}
                                            Bstyle="small"
                                            style={styles.buttonText}
                                        >
                                            Upload images
                                        </Button>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </SafeAreaView>

                </View>

                <Text variant="" style={[styles.labels, { color: theme.colors.primary }]}>Dimensiones (en mts)</Text>
                <View style={{ flexDirection: 'row' }}>
                    < TextInput label="Largo" value={length} onChangeText={setLength} inputMode="numeric" Cstyle={{ width: 100, marginRight: 16 }} />
                    < TextInput label="Ancho" value={width} onChangeText={setWidth} inputMode="numeric" Cstyle={{ width: 100, marginRight: 16 }} />
                    < TextInput label="Alto" value={height} onChangeText={setHeight} inputMode="numeric" Cstyle={{ width: 100, marginRight: 16 }} />
                </View>

                <Text variant="" style={[styles.labels, { color: theme.colors.primary }]}>Precios</Text>
                <View style={{ flexDirection: 'row' }}>
                    < TextInput label="Por hora" value={hourPrice} onChangeText={setHourPrice} keyboardType="numeric" Cstyle={{ width: 100, marginRight: 16 }} />
                    < TextInput label="Por dia" value={dayPrice} onChangeText={setDayPrice} keyboardType="numeric" Cstyle={{ width: 100, marginRight: 16 }} />
                    < TextInput label="Por mes" value={monthPrice} onChangeText={setMonthPrice} keyboardType="numeric" Cstyle={{ width: 100, marginRight: 16 }} />
                </View>

            </ScrollView>

            <TouchableOpacity style={styles.btn} onPress={handleCreateParking}>
                <Button label="Crear parking" style={{ marginTop: 24 }} />
            </TouchableOpacity>
            <View style={[{ position: 'relative', bottom: -46 }]}>

                <Snackbar
                    visible={showSnackbar}
                    text={
                        snackbarType === 'error'
                            ? 'Todos los campos son necesarios'
                            : '¡Estacionamiento creado exitosamente!'
                    }
                    BgColor={snackbarType === 'error' ? theme.colors.error : theme.colors.success}
                    onDismiss={() => setShowSnackbar(false)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexGrow: 1,
        fontFamily: 'Lexend',
        paddingHorizontal: 16,
        paddingBottom: 86,
    },
    labels: {
        marginTop: 24,
        marginBottom: 8,
    },
    input: {
        marginBottom: 16,
    },
    inputSmall: {
        marginEnd: 8,
        width: 300,
    },
    btn: {
        position: 'absolute',
        width: '100%',
        left: 16,
        right: 16,
        bottom: 16,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'start',
        alignItems: 'start',
        marginVertical: 10,
    },
    imageInput: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});

export default CreateParkingForm;
