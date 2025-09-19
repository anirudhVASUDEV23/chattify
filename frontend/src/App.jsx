import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("authUser:", authUser);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/*DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-purple-500 opacity-20 blur-[100px]" />
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

/*
Even if it only runs once per mount, when you refresh the page or navigate away and come back, App mounts again → useEffect runs → checkAuth() fires.

This is expected and correct behavior, because:

On a hard refresh, React components remount.

You need to re-check authentication status on every refresh to know whether the user is logged in.

3. Visualizing It

Let's visualize:

<App>
  └── <Routes>
        ├── "/"        → <ChatPage>
        ├── "/login"   → <LoginPage>
        └── "/signup"  → <SignUpPage>


<App /> lives at the very top and stays mounted the entire time.

Only <ChatPage>, <LoginPage>, or <SignUpPage> get swapped in and out.

Since <App /> never unmounts during navigation, useEffect does not re-run.
*/
