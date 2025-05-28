import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import Svg, { Path , Circle, Rect} from 'react-native-svg';


interface Allergen {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
};

interface Product {
  image: any;
  name: string;
  brand: string;
  allergens: Allergen[];
};

type RootStackParamList = {
  product: { product: Product };
  history: undefined;
};

type ProductScreenRouteProp = RouteProp<RootStackParamList, "product">;

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { product } = route.params || {};

  if (!product) {
    return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Produit non disponible.</Text>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={product.image} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{product.name.toUpperCase()}</Text>
            <Text style={styles.brand}>{product.brand}</Text>
          </View>
        </View>
        <Text style={styles.allergenTitle}>Allergènes présents</Text>
        <FlatList
            data={product.allergens}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.allergenCard}>
                  <View style={styles.iconContainer}>
                    {item.icon ? item.icon : <Text>Icône manquante</Text>}
                  </View>
                  <View style={styles.allergenDetails}>
                    <Text style={styles.allergenName}>{item.name}</Text>
                    <Text style={styles.allergenDescription}>{item.description}</Text>
                  </View>
                </View>
            )}
        />
      </View>
  );
};

// Exemple d'icônes SVG
const MilkIcon = () => (
    <Svg width={40} height={40} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
    </Svg>
);

const HazelnutIcon = () => (
    <Svg width={40} height={40} viewBox="0 0 100 100">
      <Path d="M50 10 A40 40 0 1 1 49.9 10" fill="brown" />
    </Svg>
);

// Exemple de données de test
const testProduct: Product = {
  image: require("../../images/chocolat noir.jpg"),
  name: "Chocolat Noir",
  brand: "cote d'or",
  allergens: [
    {
      id: "1",
      name: "Lait",
      description: "Peut contenir des traces de lait.",
      icon: <MilkIcon />,
    },
    {
      id: "2",
      name: "Noisettes",
      description: "Contient des noisettes.",
      icon: <HazelnutIcon />,
    },
  ],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  image: {
    width: 140,
    height: 180,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },
  brand: {
    fontSize: 16,
    color: "#555",
    textAlign: "left",
    marginBottom: 20,
  },
  allergenTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  allergenCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  iconContainer: {
    marginRight: 10,
    width: 40,
    height: 40, 
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  allergenDetails: {
    flex: 1,
  },
  allergenName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  allergenDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default ProductScreen;