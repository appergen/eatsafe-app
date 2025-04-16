import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

interface ScannedProductOverlayProps {
  barcodeData: string | null;
  onClose: () => void;
}

interface Product {
  name: string;
  brand: string;
  allergens: (string | undefined)[];
}

export default function ScannedProductOverlay({ barcodeData, onClose }: ScannedProductOverlayProps) {
  const [product, setProduct] = useState<Product | null>(null);

  if (!barcodeData) return null;
  
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  const handleSheetChanges = useCallback((index: number) => {
    console.log('Index', index);
  }, []);

  console.log('Barcode:', barcodeData);

  useEffect(() => {
    axios.get<GetProductById>(`https://world.openfoodfacts.org/api/v3/product/${barcodeData}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(({ data }) => {
        console.log(data);
        setProduct(() => ({
          name: data.product?.product_name_fr ?? data.product.product_name,
          brand: data.product?.brands_tags?.[0] ?? data.product.brands,
          allergens: data.product?.allergens_tags.map((tag: string) => tag.split(':').shift())
        }));
      })
  }, [barcodeData]);

  if (!product) (
    <View style={styles.containerLoader}>
      <ActivityIndicator size="large" />
    </View>
  )

  if (product) {
    return (
      <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
        <BottomSheetView style={styles.content}>
          <Text style={styles.text}>Produit scanné :</Text>
          <Text style={styles.barcode}>Nom: {product.name}</Text>
          <Text style={styles.barcode}>Brand: {product.brand}</Text>
          <Text style={styles.barcode}>Allergens: {product.allergens.join(', ')}</Text>
          <Button title="Fermer" onPress={onClose} />
        </BottomSheetView>
      </BottomSheet>
    )
  }

  // return (
  //   <BlurView intensity={60} style={styles.overlay} tint="dark">
  //     <View style={styles.content}>
  //       <Text style={styles.text}>Produit scanné :</Text>
  //       <Text style={styles.barcode}>{barcodeData}</Text>
  //       <Button title="Fermer" onPress={onClose} />
  //     </View>
  //   </BlurView>
  // )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 18,
    marginBottom: 10
  },
  barcode: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  containerLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  }
})