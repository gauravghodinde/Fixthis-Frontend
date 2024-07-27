import * as React from 'react';
import { View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useSession } from '~/ctx';
import { router } from 'expo-router';
import { LogIn } from 'lucide-react-native';


export default function welcome() {
  const { signUp, logIn,mess } = useSession();
  const [value, setValue] = React.useState('SignUp');
  const [signUpData, setSignUpData] = React.useState({
    name: 'esere',
    phoneNumber: '8532021405',
    email: 'omswi@gmail.com',
    city: 'pune',
    password: 'Tester@123'
  });
  const [logInData, setlogInData] = React.useState({
    
    phoneNumber: '8532021405',
    
    password: 'Tester@123'
  });

  const handleInputChange = (field: any, text: any, formType: string) => {
    if (formType === 'SignUp') {
      setSignUpData({ ...signUpData, [field]: text });
    } else {
      setlogInData({ ...logInData, [field]: text });
    }
  };
  return (
    <View className='flex-1 justify-center p-6 bg-black'>
      <Tabs
        value={value}
        onValueChange={setValue}
        className='w-full max-w-[400px] mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full'>
          <TabsTrigger value='SignUp' className='flex-1'>
            <Text>Sign Up</Text>
          </TabsTrigger>
          <TabsTrigger value='LogIn' className='flex-1'>
            <Text>Log In</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='SignUp'>
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                {mess}
              </CardDescription>
            </CardHeader>
            <CardContent className='gap-4 native:gap-2'>
              <View className='gap-1'>
                <Label nativeID='name'>Name</Label>
                <Input aria-aria-labelledby='name' defaultValue='Gaurav' value={signUpData.name}  onChangeText={(text) => handleInputChange('name', text, 'SignUp')} />
              </View>
              <View className='gap-1'>
                <Label nativeID='phoneNumber'>Phone No.</Label>
                <Input aria-aria-labelledby='phoneNumber' defaultValue='1234567890' value={signUpData.phoneNumber}  onChangeText={(text) => handleInputChange('phoneNumber', text, 'SignUp')} />
              </View>
              <View className='gap-1'>
                <Label nativeID='email'>Email</Label>
                <Input id='email' defaultValue='gauravghodinde@gmail.com' value={signUpData.email}  onChangeText={(text) => handleInputChange('email', text, 'SignUp')}/>
              </View>
              <View className='gap-1'>
                <Label nativeID='city'>City</Label>
                <Input id='city' defaultValue='Pune' value={signUpData.city}  onChangeText={(text) => handleInputChange('city', text, 'SignUp')}/>
              </View>
              <View className='gap-1'>
                <Label nativeID='password'>Password</Label>
                <Input id='password' defaultValue='*********' secureTextEntry value={signUpData.password}  onChangeText={(text) => handleInputChange('password', text, 'SignUp')}/>
              </View>
            </CardContent>
            <CardFooter>
              <Button onPress={ ()=> {
                 signUp(signUpData);
                router.replace('/')
              }}>
                <Text>Sign Up</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='LogIn'>
          <Card>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              {/* <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription> */}
            </CardHeader>
            <CardContent className='gap-4 native:gap-2'>
              <View className='gap-1'>
                <Label nativeID='phoneNumber'>Phone No.</Label>
                <Input placeholder='1234567890' aria-labelledby='phoneNumber' value={logInData.phoneNumber}  onChangeText={(text) => handleInputChange('phoneNumber', text, 'SignUp')} />
              </View>
              <View className='gap-1'>
                <Label nativeID='password'>password</Label>
                <Input placeholder='********' aria-labelledby='password' secureTextEntry value={logInData.password}  onChangeText={(text) => handleInputChange('name', text, 'SignUp')}/>
              </View>
            </CardContent>
            <CardFooter>
              <Button onPress={()=>{
                logIn(logInData);
                router.replace('/')
              }}>
                <Text>Log In</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}
