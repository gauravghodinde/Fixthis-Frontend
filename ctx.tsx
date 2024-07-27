import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = createContext<{
  signUp: (data : any) => void;
  logIn: (data : any) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  mess: string;
}>({
  signUp: () => null,
  logIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  mess: ""

});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [mess, setMess] = useStorageState('mess');

  return (
    <AuthContext.Provider
      value={{
        signUp: async (SignInData) => {
          console.log("sign up data "+ JSON.stringify(SignInData))
          // Perform sign-in logic here
          try {
            const response = await fetch('https://ft-final-hslfllsqe-gauravs-projects-9d6ba5c9.vercel.app/users/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(SignInData)
            });
            // console.log(JSON.stringify(response))
            if (!response.ok) {
              setMess(JSON.stringify(response))
          console.log("response not ok error "+ JSON.stringify(response))

              throw new Error('Network response was not ok' + response);
              
            }else{
              const data = await response.json();
              setMess(JSON.stringify(response))
              setSession("xxx");

            }
      
          } catch (error) {
            console.log(error);
            setMess(JSON.stringify(error))
            setSession(null);
          }
        },
        signOut: () => {
          setSession(null);
        },
        logIn: async (logInData)=>{
          console.log("log in data "+ JSON.stringify(logInData))

          // console.log("sign up data "+ JSON.stringify(logInData))
          // Perform sign-in logic here
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
              setMess(JSON.stringify(response))
          console.log("response not ok error "+ JSON.stringify(response))

              throw new Error('Network response was not ok' + response);
              
            }else{
              const data = await response.json();
              setMess(JSON.stringify(response))
              setSession(JSON.stringify(data));

            }
      
          } catch (error) {
            console.log(error);
            setMess(JSON.stringify(error))
            setSession(null);
          }
        },
        session,
        isLoading,
        mess:" "
      }}>
      {children}
    </AuthContext.Provider>
  );
}
