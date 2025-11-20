import { useAuth } from "@clerk/clerk-react";
import * as Sentry from "@sentry/react";
import { Navigate, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import CallPage from "./pages/CallPage";
import HomePage from "./pages/HomePage";
import PageLoader from "./components/PageLoader";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);
const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loader while Clerk is checking auth state
  if (!isLoaded) return null;

  return (
    <>
      <SentryRoutes>
        <Route
          path="/"
          element={
            isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />
          }
        />
        <Route
          path="/auth"
          element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="/call/:id"
          element={
            isSignedIn ? <CallPage /> : <Navigate to={"/auth"} replace />
          }
        />
        <Route
          path="*"
          element={
            isSignedIn ? <Navigate to={"/"} /> : <Navigate to={"/auth"} />
          }
        />
      </SentryRoutes>
    </>
  );
};

export default App;
