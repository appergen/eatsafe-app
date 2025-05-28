import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted || ['undetermined', 'denied'].includes(permission.status)) {
      requestPermission()
    }
  });

  if (!permission) {
    return (
      <View>
        <Text>Camera permission is required</Text>
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <View style={styles.container2}>
        <Text>Camera permission is not granted</Text>
        <Button title="Request permission" onPress={requestPermission} />
      </View>
    )
  }

  const handleBarCodeScanned = ({ type, data }: Pick<BarcodeScanningResult, 'type' | 'data'>) => {
    if (barcodeData === data) {
      return console.log('Same barcode scanned again');
    }
    if (scanned) return console.log('Scan already in progress');
    setScanned(true);
    setTimeout(() => setScanned(false), 5000); // Reset scanned state after 5 seconds
    setBarcodeData(data);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    router.push({
      pathname: '/modal',
      params: { code: data }
    })
  }
 
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={[styles.buttonHistory, {
        position: 'absolute',
        right: 20,
        top: insets.top + 10, // prend en compte l'encoche
        zIndex: 99
      }]} onPress={(() => console.log('Icon pushed'))}>
        <MaterialIcons name="history" size={32} color="#fff" />
      </TouchableOpacity>
      <View style={styles.containerCameraView}>
        <CameraView
          style={styles.camera}
          facing='back' 
          barcodeScannerSettings={{
            barcodeTypes: ['ean13']
          }}
          onBarcodeScanned={handleBarCodeScanned}
        />
      </View>

      <View style={styles.scanOverlay}>
        <View style={styles.scanFrame}>
          {/* Coins du cadre */}
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
        </View>
        <Text style={styles.scanText}>Placez le code-barres ici</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerCameraView: {
    flex: 1,
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  buttonHistory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62b55c',
    width: 80,
    height: 40,
    borderRadius: 10
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  containerLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanFrame: {
    width: 250,
    height: 150,
    borderColor: 'transparent',
    position: 'relative',
  },

  scanText: {
    color: 'white',
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },

  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#fff',
  },

  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#fff',
  },

  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#fff',
  },

  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#fff',
  },
});
