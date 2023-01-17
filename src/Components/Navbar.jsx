import React from "react";
import { Link } from "react-router-dom";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import style from "./Navbar.module.css";


const Navbar = () => {
  let data = JSON.parse(localStorage.getItem("cart")) || [];
 let totalItems = data.length;
 console.log(totalItems)
  return (
    <Box className={style.navbar}>
      <Box>
        <Text ml="5px">TeeRex Store</Text>
      </Box>
      <Box className={style.nav}>
        <Box className={style.product}>
          <Link to="/">Products</Link>
        </Box>
        <Link to="/cart">
          <HStack>
            <Image
              w="30px"
              h="25px"
              src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png"
              alt="cart logo"
            />
            <Text mt="-25px">{totalItems}</Text>
          </HStack>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
