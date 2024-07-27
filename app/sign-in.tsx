import { router } from 'expo-router';


import { useSession } from '../ctx';
import { useState } from 'react';




import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';

export default function SignIn() {
  const [value, setValue] = React.useState('account');
  const { signIn } = useSession();
  const { logIn } = useSession();
  return (
    <View className='flex-1 justify-center p-6'>
    <Button onPress={()=>{
      logIn();
      router.replace('/');
    }}>
        <Text>hii</Text>
      </Button>
  </View>
  );
}