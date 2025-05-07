import { View, ActivityIndicator, StyleSheet } from 'react-native';

export function LoaderSpinner({ size = 'large', color = '#3498db' }) {
  return (
    <View>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}