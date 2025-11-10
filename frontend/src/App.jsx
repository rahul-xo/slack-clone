import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import * as Sentry from "@sentry/react";

const App = () => {
  const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);
  return (
    <>
      <button
        onClick={() => {
          throw new Error("working frontend");
        }}
      >
        Click me
      </button>
      <SignedIn>
        <SentryRoutes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </SentryRoutes>
      </SignedIn>

      <SignedOut>
        <SentryRoutes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to={"/auth"} replace />} />
        </SentryRoutes>
      </SignedOut>
    </>
  );
};

export default App;
