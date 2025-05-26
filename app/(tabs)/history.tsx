import React, { useEffect, useState } from "react";  
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface Product_scan {
  id: string;
  image: any;
  name: string;
  pastille: "safe" | "warning" | "danger";
  date: string;
}

type RootStackParamList = {
  product: { product: Product_scan };
  history: undefined;
};

type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, "history">;

const getPastilleStyle = (level: string) => {
  switch (level) {
    case "safe":
      return { color: "#62B55C", text: "Sûr 🟢" };
    case "warning":
      return { color: "orange", text: "Risque potentiel 🟡" };
    case "danger":
      return { color: "#FF1D1D", text: "Dangereux 🔴" };
    default:
      return { color: "gray", text: "Inconnu ⚪" };
  }
};

const HistoryScreen = () => {
  const [history, setHistory] = useState<Product_scan[]>([]);
  const navigation = useNavigation<HistoryScreenNavigationProp>();

  useEffect(() => {
    const addTestData = async () => {
      const testHistory: Product_scan[] = [
        {
          id: "1",
          image: require("../../images/chocolat noir.jpg"),
          name: "NESQUICK SHAKE\nNestlé",
          pastille: "danger",
          date: "2025-03-04 14:30",
        },
        {
          id: "2",
          image: require("../../images/yaourt fraise.jpg"),
          name: "SUÉDOIS DUO DE SAUMON\nSodebo",
          pastille: "danger",
          date: "2025-03-03 16:45",
        },
        {
          id: "3",
          image: require("../../images/Biscuits archide.jpg"),
          name: "S.PELLEGRINO NATURE\nSan Pellegrino",
          pastille: "safe",
          date: "2025-03-02 10:15",
        },
        {
          id: "4",
          image: require("../../images/yaourt fraise.jpg"),
          name: "LE MOELLEUX DOUX\nMatatie",
          pastille: "safe",
          date: "2025-03-01 11:10",
        },
        {
          id: "5",
          image: require("../../images/chocolat noir.jpg"),
          name: "Kinder Bueno\nSodebo",
          pastille: "danger",
          date: "2025-02-28 09:00",
        },
      ];

      await AsyncStorage.setItem("scanHistory", JSON.stringify(testHistory));
      setHistory(testHistory);
    };

    const fetchHistory = async () => {
      await AsyncStorage.clear();
      const storedHistory = await AsyncStorage.getItem("scanHistory");
      if (!storedHistory) {
        await addTestData();
      } else {
        setHistory(JSON.parse(storedHistory));
      }
    };

    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const pastille = getPastilleStyle(item.pastille);
          const [productName, brand] = item.name.split('\n');

          return (
            <TouchableOpacity onPress={() => navigation.navigate("product", { product: item })}>
              <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.name}>{productName}</Text>
                  {brand && <Text style={styles.brand}>{brand}</Text>}
                  <View style={[styles.pastille, { backgroundColor: pastille.color }]} />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: "#ffffff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 0.8,  
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    paddingHorizontal: 5,
    width: "90%",           // <-- Réduit la largeur
    alignSelf: "center",
  },
  image: {
    width: 50,
    height: 80,
    resizeMode: "contain",
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "Futura-Bold",
  },
  brand: {
    color: "gray",
    fontSize: 14,
    marginTop: 2,
    fontFamily: "Inter-ExtraLight",
  },
  pastille: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginTop: 6,
  },
  date: {
    display: "none",
  },
});

export default HistoryScreen;
