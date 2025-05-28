import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Animated } from 'react-native';

interface ModalLayoutProps {
  children: ReactNode,
  style: any;
}

export default function ModalLayout({ children, style }: ModalLayoutProps) {
  return <Animated.View style={[s.app, ...(Array.isArray(style) ? style : [style])]}>{children}</Animated.View>
}

const s = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fafafa'
  }
})