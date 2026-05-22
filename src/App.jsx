// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AuthLayout from "./components/AuthLayout";
// import SignInForm from "./components/SignInForm";
// import SignUpForm from "./components/SignUpForm";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Route for Sign In */}
//         <Route
//           path="/signin"
//           element={
//             <AuthLayout isSignUp={false}>
//               <SignInForm />
//             </AuthLayout>
//           }
//         />

//         {/* Route for Sign Up */}
//         <Route
//           path="/signup"
//           element={
//             <AuthLayout isSignUp={true}>
//               <SignUpForm />
//             </AuthLayout>
//           }
//         />

//         {/* Redirect root "/" and "/home" to "/signin" */}
//         <Route path="/" element={<Navigate to="/signin" replace />} />
//         <Route path="/home" element={<Navigate to="/signin" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
// Import your Dashboard component (adjust the path if it's located somewhere else)
import Dashboard from "./Page/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for Sign In */}
        <Route
          path="/signin"
          element={
            <AuthLayout isSignUp={false}>
              <SignInForm />
            </AuthLayout>
          }
        />

        {/* Route for Sign Up */}
        <Route
          path="/signup"
          element={
            <AuthLayout isSignUp={true}>
              <SignUpForm />
            </AuthLayout>
          }
        />

        {/* New Route for Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirect root "/" and "/home" to "/signin" */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/home" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
