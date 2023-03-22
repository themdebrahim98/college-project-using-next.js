import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoMakaut from "../../../assets/images/logos/logo_makaut.png";

const LogoIcon = () => {
  return (
  
      <Image width={200} style={{textAlign:'center'}} src={LogoMakaut} alt={LogoMakaut} />
    
  );
};

export default LogoIcon;
