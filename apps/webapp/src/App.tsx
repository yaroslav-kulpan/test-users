import React from "react";
import { ToastContainer } from "react-toastify";

import { Users } from "./widgets/Users";

export default function App() {
  return (
    <>
      <Users />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
