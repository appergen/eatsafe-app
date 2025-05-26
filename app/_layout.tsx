import React from "react"; 
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HistoryScreen from "./(tabs)/history";
import ProductScreen from "./(tabs)/product";

const Stack = createStackNavigator();

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
      {/* Assurez-vous que la flèche est bien dans un Text */}
      <Text style={{ fontSize: 28, color: 'black' }}>{'<'}</Text>
    </TouchableOpacity>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="history">
      <Stack.Screen
        name="history"
        component={HistoryScreen}
        options={{
          headerShown: true,
          title: "Historique",
          headerTitleStyle: { color: '#62B55C', fontSize: 24, fontFamily: 'Futura Bold' },
          headerTitleAlign: 'left',
          headerLeft: () => <BackButton />
        }}
      />
      <Stack.Screen
        name="product"
        component={ProductScreen}
        options={{ headerShown: true, title: "Produit" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
