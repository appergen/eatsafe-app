import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import { fetch } from 'expo/fetch'; 
import ScannedProductOverlay from '@/components/ScannedProductOverlay';

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState<string | null>(null);

  if (!permission) {
    return (
      <View>
        <Text>Camera permission is required</Text>
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>Camera permission is not granted</Text>
        <Button title="Request permission" onPress={requestPermission} />
      </View>
    )
  }

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    if (scanned) return console.log('Scan already in progress');
    setScanned(true);
    setBarcodeData(data);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing='back'
        barcodeScannerSettings={{
          barcodeTypes: ['codabar', 'ean13', 'qr']
        }}
        onBarcodeScanned={handleBarCodeScanned}
        onResponderReject={() => console.log('onResponderReject')}
        onResponderGrant={() => console.log('onResponderGrant')}
        onResponderMove={() => console.log('onResponderMove')}
        onResponderRelease={() => console.log('onResponderRelease')}
        onResponderStart={() => console.log('onResponderStart')}
        onResponderEnd={() => console.log('onResponderEnd')}
        onCameraReady={() => console.log('onCameraReady')}
        onMountError={() => console.log('onMountError')}
        onLayout={() => console.log('onLayout')}
      >
      </CameraView>
      {scanned && (
        <ScannedProductOverlay barcodeData={barcodeData} onClose={() => {
          setScanned(false);
          setBarcodeData(null)
        }}/>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  camera: {
    flex: 1
  },
  containerLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
