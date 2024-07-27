import { Slot } from 'expo-router';
import { SessionProvider } from '../ctx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NAV_THEME } from '~/lib/constants';
import { Platform } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { SplashScreen, Stack } from 'expo-router';
import '~/global.css';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


SplashScreen.preventAutoHideAsync();




export default function Root() {
  // Set up the auth context and render our layout inside of it.
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
  
        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);
  if (!isColorSchemeLoaded) {
    return null;
  }

  
  return (
<ThemeProvider value={isDarkColorScheme ? LIGHT_THEME : LIGHT_THEME}>
    <SessionProvider>
{/* <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} /> */}
      <Slot />
    </SessionProvider>
</ThemeProvider>
  );
}
