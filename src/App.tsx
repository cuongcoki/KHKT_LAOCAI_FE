import { Toaster } from "react-hot-toast";
import { Router } from "./router";
import { ThemeProvider, useAuthStore } from "./utility";
import { useEffect } from "react";
import { SocketProvider } from "./services/SocketContext";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <ThemeProvider>
        <SocketProvider>
          <Router />
          <Toaster position="top-right" gutter={12} />
        </SocketProvider>
      </ThemeProvider>
    </>
  );
}

export default App;