import { Text, View } from 'react-native';
// import '~/global.css'
import { useSession } from '../../ctx';
import { Button } from '~/components/ui/button';

// import React from 'react';
import { useState } from 'react';
import { router } from 'expo-router';
export default function Index() {
  const { signOut } = useSession();

  
  const [value, setValue] = useState('account');
  return (
    <View className='flex-1 justify-center p-6'>
      <Button onPress={()=>{
        signOut();
        router.replace('/')
      }}>
        <Text>signout</Text>
      </Button>
    </View>
  );
}
