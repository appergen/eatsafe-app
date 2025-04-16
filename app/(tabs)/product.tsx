import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

interface Allergen {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Product {
  image: any;
  name: string;
  description: string;
  allergens: Allergen[];
}

type RootStackParamList = {
  product: { product: Product };
  history: undefined;
};

type ProductScreenRouteProp = RouteProp<RootStackParamList, "product">;

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { product } = route.params || {}; // Gestion des paramètres manquants

  if (!product) {
    return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Produit non disponible.</Text>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <Image source={product.image} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.allergenTitle}>Allergènes :</Text>
        <FlatList
            data={product.allergens}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.allergenCard}>
                  <Text style={styles.allergenName}>{item.name}</Text>
                  <Text style={styles.allergenDescription}>{item.description}</Text>
                </View>
            )}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  allergenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  allergenCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  allergenName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  allergenDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default ProductScreen;