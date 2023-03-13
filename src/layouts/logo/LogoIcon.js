import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoMakaut from "../../../assets/images/logos/logo_makaut.png";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image src={LogoMakaut} alt={LogoMakaut} />
    </Link>
  );
};

export default LogoIcon;
