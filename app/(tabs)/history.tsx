import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import MilkIcon from "../../assets/icons/milk.svg";
import PeanutIcon from "../../assets/icons/peanut.svg";
import GlutenIcon from "../../assets/icons/gluten.svg";
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
const chocolatImage = require("../../images/chocolat_noir.jpg");
const yaourtImage = require("../../images/yaourt_fraise.jpg");
const biscuitsImage = require("../../images/Biscuits_archide.jpg");


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
    console.log("Le composant HistoryScreen est monté");
    const addTestData = async () => {
    
      const testHistory: Product_scan[] = [
        {
          id: "1",
          image: chocolatImage,
          
          name: "Chocolat Noir",
          pastille: "safe",
          date: "2025-03-04 14:30",
          allergens: [
            {
              id: "1",
              name: "Lait",
              description: "Peut contenir des traces de lait.",
              icon: MilkIcon,
            },
            {
              id: "2",
              name: "Noisettes",
              description: "Contient des noisettes.",
              icon: PeanutIcon,
            },
          ],
        },
        {
          id: "2",
          image: yaourtImage,
          name: "Yaourt Fraise",
          pastille: "warning",
          date: "2025-03-03 16:45",
          allergens: [
          ],
        },
        {
          id: "3",
          image: biscuitsImage,
          name: "Biscuits Arachide",
          pastille: "danger",
          date: "2025-03-02 10:15",
          allergens: [
            {
              id: "4",
              name: "Arachides",
              description: "Contient des arachides.",
              icon: PeanutIcon,
            },
            {
              id: "5",
              name: "Gluten",
              description: "Contient du gluten.",
              icon: GlutenIcon,
            },
          ],
        },
      ];
      
      await AsyncStorage.setItem("scanHistory", JSON.stringify(testHistory));
      setHistory(testHistory);
    };

    const fetchHistory = async () => {
    
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