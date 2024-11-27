import React, { useEffect } from "react";
import Navbar from "../Components/Navabr";
import { useNavigate } from "react-router-dom";
const Home = () => {

  const navigate = useNavigate()
  useEffect(() => {
    const auth = async() => {
      const token = await localStorage.getItem("token");
      if (!token){
        navigate("/login")
      }
    }
    auth();
  },[])
  return (
    <div>
      <div className="row">
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
