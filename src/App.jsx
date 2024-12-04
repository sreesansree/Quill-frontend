import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import Header from "./components/Header.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import CreateArticle from "./pages/CreateArticle.jsx";
import EditArticle from "./pages/EditArticle.jsx";
import NotFound from "./components/NotFound.jsx";
import React, { Suspense, useEffect, useState } from "react";
import Spinner from "./components/Spinner.jsx";
import Profile from "./pages/Profile.jsx";
import Footer from "./components/Footer.jsx";
// import ArticleDetails from "./pages/ArticleDetails.jsx";
// import MyArticles from "./pages/MyArticles.jsx";
// import Articles from "./pages/Articles.jsx";

// const MyArticles = React.lazy(() => import("./pages/MyArticles.jsx"));
const Dashboard = React.lazy(() => import("./pages/Dashboard.jsx"));
const Articles = React.lazy(() => import("./pages/Articles.jsx"));
const ArticleDetails = React.lazy(() => import("./pages/ArticleDetails.jsx"));
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // console.log("Loading started");
    setTimeout(() => {
      setLoading(false);
      // console.log("Loading finished");
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Router>
            <Header />
            <Routes>
              <Route path="/register" element={<Signup />} />
              <Route path="/otp-verification" element={<OtpVerification />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route element={<PrivateRoute />}>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <Dashboard />
                    </Suspense>
                  }
                />

                <Route
                  path="/articles/:id"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <ArticleDetails />
                    </Suspense>
                  }
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="/create" element={<CreateArticle />} />

                <Route
                  path="/MyArticles"
                  element={
                    <Suspense fallback={<Spinner />}>
                      {/* <MyArticles /> */}
                      <Articles />
                    </Suspense>
                  }
                />
                <Route path="/edit-article/:id" element={<EditArticle />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
