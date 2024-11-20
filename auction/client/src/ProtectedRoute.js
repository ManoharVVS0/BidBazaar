// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // Redirect to the SignUp page if not logged in
    return <Navigate to="/sign-up" replace />;
  }

  // Otherwise, render the protected content
  return children;
}

export default ProtectedRoute;
