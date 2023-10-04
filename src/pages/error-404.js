import React from "react";
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div class="section">
      <h1 class="error">404</h1>
      <div class="page">Ooops!!! The page you are looking for is not found</div>
     <Link to="/">  <a class="back-home" href="#!">
        Back to home
      </a>
      </Link>
    </div>
  );
};
