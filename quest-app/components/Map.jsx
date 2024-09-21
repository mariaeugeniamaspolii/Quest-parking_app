// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import React, {
//     forwardRef,
//     memo,
//     useCallback,
//     useEffect,
//     useImperativeHandle,
//     useMemo,
//     useState,
// } from 'react';
// import { mapMouseEventToMapEvent } from '../utils/mouse-event';
// import { transformRNCameraObject } from '../utils/camera';
// import {
//     logMethodNotImplementedWarning,
//     logDeprecationWarning,
// } from '../utils/log';
// import { useUserLocation } from './UserAddress';
// import * as Location from 'expo-location';

// function _MapView(props, ref) {
//     // State
//     const [map, setMap] = useState(null);
//     const [isGesture, setIsGesture] = useState(false);

//     const userLocation = useUserLocation({
//         showUserLocation: props.showsUserLocation || false,
//         requestPermission: props.showsUserLocation || !!props.onUserLocationChange || false,
//         onUserLocationChange: props.onUserLocationChange,
//         followUserLocation: props.followsUserLocation || false,
//     });

//     const { isLoaded } = useJsApiLoader({
//         googleMapsApiKey: props.googleMapsApiKey || '',
//     });

//  // Callbacks

// const _onMapReady = (_map) => {
//     setMap(_map);
//     props.onMapReady?.();
// };

// const _onDragStart = () => {
//     setIsGesture(true);
// };

// const _onRegionChange = () => {
//     const bounds = map?.getBounds();
//     if (bounds) {
//         const northEast = bounds.getNorthEast();
//         const southWest = bounds.getSouthWest();
//         const longitudeDelta = Math.abs(northEast.lng() - southWest.lng());
//         const latitudeDelta = Math.abs(northEast.lat() - southWest.lat());
//         const center = bounds.getCenter();
//         props.onRegionChange?.(
//             {
//                 latitude: center.lat(),
//                 longitude: center.lng(),
//                 latitudeDelta,
//                 longitudeDelta,
//             },
//             { isGesture }
//         );
//     }
// };

// const _onRegionChangeComplete = () => {
//     const bounds = map?.getBounds();
//     if (bounds) {
//         const northEast = bounds.getNorthEast();
//         const southWest = bounds.getSouthWest();
//         const longitudeDelta = Math.abs(northEast.lng() - southWest.lng());
//         const latitudeDelta = Math.abs(northEast.lat() - southWest.lat());
//         const center = bounds.getCenter();
//         props.onRegionChangeComplete?.(
//             {
//                 latitude: center.lat(),
//                 longitude: center.lng(),
//                 latitudeDelta,
//                 longitudeDelta,
//             },
//             { isGesture }
//         );
//     }
//     setIsGesture(false);
// };

// // Ref handle

// useImperativeHandle(ref, () => {
//     return {
//         async getCamera() {
//             const center = map?.getCenter();
//             return {
//                 altitude: 0,
//                 heading: map?.getHeading() || 0,
//                 pitch: map?.getTilt() || 0,
//                 zoom: map?.getZoom() || 0,
//                 center: {
//                     latitude: center?.lat() || 0,
//                     longitude: center?.lng() || 0,
//                 },
//             };
//         },
//         setCamera(camera) {
//             map?.moveCamera(transformRNCameraObject(camera));
//         },
//         animateCamera(camera, _opts) {
//             map?.moveCamera(transformRNCameraObject(camera));
//         },
//         async getMapBoundaries() {
//             const bounds = map?.getBounds();

//             const northEast = bounds?.getNorthEast();
//             const southWest = bounds?.getSouthWest();

//             return {
//                 northEast: {
//                     latitude: northEast?.lat() || 0,
//                     longitude: northEast?.lng() || 0,
//                 },
//                 southWest: {
//                     latitude: southWest?.lat() || 0,
//                     longitude: southWest?.lng() || 0,
//                 },
//             };
//         },
//         animateToRegion(region, _duration) {
//             const bounds = new google.maps.LatLngBounds();

//             bounds.extend({
//                 lat: region.latitude - region.latitudeDelta / 2,
//                 lng: region.longitude - region.longitudeDelta / 2,
//             });

//             bounds.extend({
//                 lat: region.latitude + region.latitudeDelta / 2,
//                 lng: region.longitude + region.longitudeDelta / 2,
//             });

//             map?.fitBounds(bounds);
//         },
//         // Rest of your functions
//     };
// }, [map]);

// // Side effects
// useEffect(() => {
//     if (props.followsUserLocation && userLocation) {
//         map?.panTo({
//             lat: userLocation.coords.latitude,
//             lng: userLocation.coords.longitude,
//         });
//     }
// }, [props.followsUserLocation, userLocation]);

// const mapNode = useMemo(() => {
//     return (
//         <GoogleMap
//             onLoad={_onMapReady}
//             onBoundsChanged={_onRegionChange}
//             onDragStart={_onDragStart}
//             onDragEnd={_onRegionChangeComplete}
//             mapContainerStyle={{ flex: 1 }}
//             zoom={props.initialCamera?.zoom || 3}
//             heading={props.initialCamera?.heading}
//             tilt={props.initialCamera?.pitch}
//             onDrag={() => {
//                 const center = map?.getCenter();

//                 props.onPanDrag?.(
//                     mapMouseEventToMapEvent(
//                         null,
//                         center && { latitude: center.lat(), longitude: center.lng() },
//                         map,
//                         undefined
//                     )
//                 );
//             }}
//             onClick={(e) =>
//                 props.onPress?.(mapMouseEventToMapEvent(e, null, map, 'press'))
//             }
//             onDblClick={(e) =>
//                 props.onDoublePress?.(mapMouseEventToMapEvent(e, null, map, 'press'))
//             }
//             center={
//                 map
//                     ? map.getCenter()
//                     : {
//                         lat:
//                             props.initialCamera?.center.latitude ||
//                             props.initialRegion?.latitude ||
//                             0,
//                         lng:
//                             props.initialCamera?.center.longitude ||
//                             props.initialRegion?.longitude ||
//                             0,
//                     }
//             }
//             options={{
//                 scrollwheel: props.zoomEnabled,
//                 disableDoubleClickZoom: !props.zoomTapEnabled,
//                 zoomControl: props.zoomControlEnabled,
//                 rotateControl: props.rotateEnabled,
//                 minZoom: props.minZoomLevel, // TODO: Normalize value
//                 maxZoom: props.maxZoomLevel, // TODO: Normalize value
//                 scaleControl: props.showsScale,
//                 styles: props.customMapStyle,
//                 ...(props.options || {}),
//             }}
//         >
//             {props.showsUserLocation && userLocation && (
//                 <UserLocationMarker coordinates={userLocation.coords} />
//             )}
//         </GoogleMap>
//     );
// }, [
//     _onRegionChange,
//     _onMapReady,
//     userLocation,
//     props.initialCamera,
//     props.initialRegion,
//     props.showsUserLocation,
//     props.onPanDrag,
//     props.onPress,
//     props.onDoublePress,
//     props.zoomEnabled,
//     props.zoomTapEnabled,
//     props.zoomControlEnabled,
//     props.rotateEnabled,
//     props.minZoomLevel,
//     props.maxZoomLevel,
//     props.showsScale,
//     props.customMapStyle,
//     props.options,
// ]);

//     if (props.provider !== 'google') {
//         console.warn(
//             '[WARNING] `react-native-web-maps` only suppots google for now. Please pass "google" as provider in props'
//         );

//         return null;
//     }

//     return isLoaded ? (
//         React.cloneElement(mapNode, { children: props.children })
//     ) : (
//         <>{props.loadingFallback || null}</>
//     );
// }

// export const MapView = memo(forwardRef(_MapView));