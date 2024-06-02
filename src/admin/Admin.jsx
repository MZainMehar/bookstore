import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookForm from "../components/BookForm";
function Admin() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen pt-20">
        <BookForm />
      </div>
      <Footer />
    </>
  );
}

export default Admin;
