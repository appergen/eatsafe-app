import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import ScannedProductOverlay from '@/components/ScannedProductOverlay';

export default function HomeScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState<string | null>(null);

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

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    if (scanned) return console.log('Scan already in progress');
    setScanned(true);
    setBarcodeData(data);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    router.push({
      pathname: '/modal',
      params: { code: data }
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.containerHistory}>
        <TouchableOpacity style={styles.buttonHistory} onPress={(() => console.log('Icon pushed'))}>
          <MaterialIcons name="history" size={32} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing='back' 
          barcodeScannerSettings={{
            barcodeTypes: ['codabar', 'ean13', 'qr']
          }}
          onBarcodeScanned={handleBarCodeScanned}
        >
        </CameraView>
        {scanned && (
          <ScannedProductOverlay barcodeData={barcodeData} onClose={() => {
            setScanned(false);
            setBarcodeData(null);
          }}/>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  containerHistory: {
    zIndex: 99,
    position: 'absolute',
    right: 20,
    top: 10
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
    flex: 1
  },
  containerLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
