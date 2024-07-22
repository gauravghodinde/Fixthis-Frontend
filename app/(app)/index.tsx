import { Text, View } from 'react-native';

import { useSession } from '../../ctx';
// const Home = () => {
//   return (
//     // <View style={styles.container}>
//     <Text>Welcome to the Home Screen!</Text>
//     // </View>
//   );
// };

export default function Index() {
  // const Home = () => {
  //   return (
  //     // <View style={styles.container}>
  //     <Text>Welcome to the Home Screen!</Text>
  //     // </View>
  //   );
  // };

  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
