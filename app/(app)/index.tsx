import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useSession } from '../../ctx';

export default function Index() {
  const { signOut } = useSession();
  const { session, isLoading } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{session}</Text>
      <Text
        onPress={() => {
          
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
