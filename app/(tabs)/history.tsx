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

// Définir les types des routes
type RootStackParamList = {
  product: { product: Product_scan };
  history: undefined;
};

type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, "history">;

const getPastilleStyle = (level: string) => {
  switch (level) {
    case "safe":
      return { color: "green", text: "Sûr 🟢" };
    case "warning":
      return { color: "orange", text: "Risque potentiel 🟡" };
    case "danger":
      return { color: "red", text: "Dangereux 🔴" };
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
          name: "Chocolat Noir",
          pastille: "safe",
          date: "2025-03-04 14:30",
        },
        {
          id: "2",
          image: require("../../images/yaourt fraise.jpg"),
          name: "Yaourt Fraise",
          pastille: "warning",
          date: "2025-03-03 16:45",
        },
        {
          id: "3",
          image: require("../../images/Biscuits archide.jpg"),
          name: "Biscuits Arachide",
          pastille: "danger",
          date: "2025-03-02 10:15",
        },
      ];

      await AsyncStorage.setItem("scanHistory", JSON.stringify(testHistory));
      setHistory(testHistory);
    };

    const fetchHistory = async () => {
      await AsyncStorage.clear();
      const storedHistory = await AsyncStorage.getItem("scanHistory");
      if (!storedHistory) {
        await addTestData(); // Ajoute les données factices si l'historique est vide
      } else {
        setHistory(JSON.parse(storedHistory));
      }
    };

    fetchHistory();
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Historique des scans</Text>
        <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const pastille = getPastilleStyle(item.pastille);
              return (
                  <TouchableOpacity
                      onPress={() => navigation.navigate("product", { product: item })}
                  >
                    <View style={styles.card}>
                      <Image source={item.image} style={styles.image} />
                      <View style={styles.details}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={[styles.pastille, { color: pastille.color }]}>
                          {pastille.text}
                        </Text>
                        <Text style={styles.date}>Scanné le : {item.date}</Text>
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
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  pastille: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
});

export default HistoryScreen;