import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoaderSpinnerProps {
  size?: number | "small" | "large" | undefined,
  color?: string
}

export function LoaderSpinner({ size, color }: LoaderSpinnerProps = {
  size: "large",
  color: "#0000ff"
}) {
  return (
    <View>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}