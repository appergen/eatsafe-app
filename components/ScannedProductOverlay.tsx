import { BlurView } from "expo-blur";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

interface ScannedProductOverlayProps {
  barcodeData: string | null;
  onClose: () => void;
}

interface Product {
  name: string;
  brand: string;
  allergens: string[];
}

export default function ScannedProductOverlay({ barcodeData, onClose }: ScannedProductOverlayProps) {
  const [product, setProduct] = useState<Product | null>(null);

  if (!barcodeData) return null;

  console.log('Barcode:', barcodeData);

  useEffect(() => {
    axios.get(`https://world.openfoodfacts.org/api/v3/product/${barcodeData}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(({ data }) => {
        console.log(data);
        setProduct({
          name: data.product?.product_name_fr ?? data.product.product_name,
          brand: data.product?.brands_tags?.[0] ?? data.product.brands,
          allergens: data.product?.allergens_tags.map((tag: string) => tag.split(':').shift())
        })
      })
  }, [barcodeData]);

  if (!product) (
    <View style={styles.containerLoader}>
      <ActivityIndicator size="large" />
    </View>
  )

  if (product) {
    return (
    <BlurView intensity={60} style={styles.overlay} tint="dark">
      <View style={styles.content}>
        <Text style={styles.text}>Produit scanné :</Text>
        <Text style={styles.barcode}>Nom: {product.name}</Text>
        <Text style={styles.barcode}>Brand: {product.brand}</Text>
        <Text style={styles.barcode}>Allergens: {product.allergens.join(', ')}</Text>
        <Button title="Fermer" onPress={onClose} />
      </View>
    </BlurView>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  barcode: {
    color: '#fff',
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