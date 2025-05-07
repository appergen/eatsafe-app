import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, Platform, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

export default function Modal() {
  const params = useLocalSearchParams();
  console.log(params);

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000040'
      }}
    >
      <Link href="/" asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>
      <Animated.View
        entering={SlideInDown}
        style={{
          width: '90%',
          height: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white'
        }}
      >
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Modal Screen</Text>
        <Text>Data : {params.code} </Text>
        <Link href="/">
          <Text>{'<- '}Go back</Text>
        </Link>
      </Animated.View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})