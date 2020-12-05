import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./container/Header";
import Footer from "./container/Footer";
export default function App(props) {
  return (
    <div className="App">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
