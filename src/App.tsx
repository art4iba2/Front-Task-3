import { useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import AuthForm from "./components/auth/AuthForm";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {isAuth ? (
        <AppLayout />
      ) : (
        <AuthForm onLogin={() => setIsAuth(true)} />
      )}
    </>
  );
}

export default App;