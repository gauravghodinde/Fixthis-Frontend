import React, { useState } from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = React.createContext<{
  signIn: () => void;
  logIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  logIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}



export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [signUpData, setSignUpData] = useState({
    name: 'esere',
    phoneNumber: '8532021405',
    email: 'omswi@gmail.com',
    city: 'pune',
    password: 'Tester@123'
  });
  const [logInData, setlogInData] = useState({
    
    phoneNumber: '8532021405',
    
    password: 'Tester@123'
  });
  
  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          // Perform sign-in logic here
          try {
            const response = await fetch('https://ft-final.onrender.com/users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(logInData)
            });
            // console.log(JSON.stringify(response))
            if (!response.ok) {
              throw new Error('Network response was not ok' + response);
            }
      
            const data = await response.json();
            setSession("xxx");
          } catch (error) {
            console.log(error);
            setSession(null);
          }
          
        },
        signOut: () => {
          setSession(null);
        },
        logIn: async () => {
          // Perform sign-in logic here
          console.log("loging in")
          try {
            const response = await fetch('https://ft-final-hslfllsqe-gauravs-projects-9d6ba5c9.vercel.app/users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(logInData)
            });
            // console.log(JSON.stringify(response))
            if (!response.ok) {
              throw new Error('Network response was not ok' + response);
            }
            
            const data = await response.json();
            setSession(JSON.stringify(data));
          } catch (error) {
            console.log(error);
            setSession(null);
          }
          
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
