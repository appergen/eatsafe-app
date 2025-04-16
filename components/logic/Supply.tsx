import type { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface SupplyProps {
    children: ReactNode;
}

export default function Supply({ children }: SupplyProps) {
    const colorScheme = useColorScheme();

    return (
        <GestureHandlerRootView>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                {children}
            </ThemeProvider>
        </GestureHandlerRootView>
    )
}