import React, {
    useState,
    useEffect
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActionSheetIOS,
    TouchableOpacity,
    Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
    Camera
} from 'expo-camera';
import {
    Ionicons
} from '@expo/vector-icons';

export default function App() {
    const [isActionSheetVisible,
        setIsActionSheetVisible] = useState(false);
    const [hasCameraPermission,
        setHasCameraPermission] = useState(null);
    const [hasGalleryPermission,
        setHasGalleryPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const {
                status
            } = await Camera.requestPermissionsAsync();
            setHasCameraPermission(status === 'granted');

            const {
                status: galleryStatus
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus === 'granted');
        })();
    }, []);

    const showActionSheet = () => {
        setIsActionSheetVisible(true);
    };

    const hideActionSheet = () => {
        setIsActionSheetVisible(false);
    };

    const handleActionSheetPress = async (index) => {
        if (index === 0) {
            
            if (hasCameraPermission) {
                const {
                    uri
                } = await ImagePicker.launchCameraAsync();
                handleImage(uri);
            }
        } else if (index === 1) {
            
            if (hasGalleryPermission) {
                const {
                    uri
                } = await ImagePicker.launchImageLibraryAsync();
                handleImage(uri);
            }
        }
        hideActionSheet();
    };

    const handleImage = (uri) => {

        console.log(`Selected image URI: ${uri}`);
    };

    const actionSheetOptions = [{
        label: 'Camera',
        icon: 'camera'
    },
        {
            label: 'Library',
            icon: 'images'
        },
        {
            label: 'Cancel',
            isCancel: true
        },
    ];

    return (
        <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={showActionSheet}>
      <Ionicons name="image-outline" size={24} color="#fff" />
      <Text style={styles.buttonText}>Pick an Image</Text>
    </TouchableOpacity>
      {isActionSheetVisible && (
            <View style={styles.overlay}>
          <View style={styles.actions}>
            {actionSheetOptions.map((option, index) => (
                <Text
                    key={option.label}
                    style={index === 2 ? styles.cancelOption: styles.option}
                    onPress={() => handleActionSheetPress(index)}>
                {option.icon && (
                        <Ionicons
                            name={option.icon}
                            size={20}
                            color={index === 2 ? '#007aff': 'white'}
                            style={ { marginLight: 20, marginRight: 20 }}
                            />
                    )}
                {option.label}
              </Text>
            ))}
          </View>
        </View>
        )}
    </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey',
        },
        text: {
            color: 'white',
            fontSize: 18,
        },
        overlay: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#1c1c1e',
            borderTopWidth: 1,
            borderTopColor: '#2c2c2e',
        },
        actions: {
            paddingTop: 10,
        },
        option: {
            color: 'white',
            paddingVertical: 12,
            paddingHorizontal: 20,
            textAlign: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#2c2c2e',
            fontSize: 18,
            flexDirection: 'row',
            alignItems: 'center',
        
            
        },
        cancelOption: {
            color: 'red',
            paddingVertical: 12,
            paddingHorizontal: 20,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
        },
        buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
    });