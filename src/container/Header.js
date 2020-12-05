import React from "react";
import { Link } from "react-router";
export default function Header() {
  return (
    <div>
      <Link to={"/login"}>Login</Link>
      <Link to={"/signup"}>Signup</Link>
      <Link to={"/dashboard"}>Dashboard</Link>
    </div>
  );
}
