import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import {Routes,Route,BrowserRouter,useLocation,useNavigationType,createRoutesFromChildren,matchRoutes} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider.jsx";
import * as Sentry from "@sentry/react"

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

Sentry.init({
  dsn: "https://d8014b6c9dc39dac61e4627e84c410cf@o4510304875184128.ingest.de.sentry.io/4510339085107280",
  sendDefaultPii: true,
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
});

createRoot(document.getElementById("root")).render(

    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
          <Toaster position="top-right" />
        </QueryClientProvider>
      </BrowserRouter>
    </ClerkProvider>
);
