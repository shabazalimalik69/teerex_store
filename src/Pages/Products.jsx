import {
  Box,
  Button,
  Checkbox,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import style from "./Common.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const toast = useToast();
 
  const getData = () => {
    axios
      .get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
      .then((res) => {
        setProducts(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAdd = (el) => {
    let count = 0;
    let cartArr = JSON.parse(localStorage.getItem("cart")) || [];
    for (let i = 0; i < cartArr.length; i++) {
      if (el.id === cartArr[i].id) {
        count = count + 1;
      }
    }
    if (count === 1) {
      toast({
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        render: () => (
          <Box borderRadius={5} align="center" color="white" p={3} bg="red.500">
            Product is already added to Cart
          </Box>
        ),
      });
    } else {
      let qty = 1;
      cartArr.push({ ...el, qty });
      localStorage.setItem("cart", JSON.stringify(cartArr));
      toast({
        title: "Product Added",
        description: "Product Added to Cart",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      getData();
    } else {
      const filteredData = products.filter((el) =>
        el.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        el.type.toLowerCase().includes(e.target.value.toLowerCase()) ||
        el.color.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setProducts(filteredData);
    }
  };

  const handleColor = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const filteredColorData = products.filter(item =>item.color===value);
      setProducts(filteredColorData)
      } else{
       getData()
    }
}
const handleGender = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    const filteredGenderData = products.filter(item =>item.gender===value);
    setProducts(filteredGenderData)
    } else{
     getData()
  }
}

const handleType = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    const filteredTypeData = products.filter(item =>item.type===value);
    setProducts(filteredTypeData)
    } else{
     getData()
  }
}


  const handlePrice = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const filteredPriceData = products.filter((el) => el.price === +value);
      setProducts(filteredPriceData);
    } else {
      getData();
    }
  };

 
  return (
    <Box className={style.container}>
      {/* ---------------------------Left Section Filter Part-------------------------- */}

      <Box className={style.left_section}>
        <VStack spacing={2} align="stretch" padding="20px">
          <Text fontWeight="bold">Color</Text>
          <Checkbox name="color" value="Red" onChange={handleColor} >Red</Checkbox>
          <Checkbox name="color" value="Blue" onChange={handleColor}>Blue</Checkbox>
          <Checkbox name="color" value="Green" onChange={handleColor}>Green</Checkbox>
          <Checkbox name="color" value="Black" onChange={handleColor} >Black</Checkbox>
          <Checkbox name="color" value="Pink" onChange={handleColor}>Pink</Checkbox>
          <Checkbox name="color" value="Grey" onChange={handleColor}>Grey</Checkbox>
          <Checkbox name="color" value="Purple" onChange={handleColor}>Purple</Checkbox>
          <Checkbox name="color" value="White" onChange={handleColor}>White</Checkbox>
          <Checkbox name="color" value="Yellow" onChange={handleColor}>Yellow</Checkbox>
        </VStack>
        <VStack spacing={2} align="stretch" padding="20px">
          <Text fontWeight="bold">Gender</Text>
          <Checkbox name="gender" value="Men" onChange={handleGender}>Men</Checkbox>
          <Checkbox name="gender" value="Women" onChange={handleGender}>Women</Checkbox>
        </VStack>
        <VStack spacing={2} align="stretch" padding="20px">
          <Text fontWeight="bold">Price</Text>
          {/* <Checkbox name="price" value={250} onChange={handlePrice}>
            Rs 0-Rs 250
          </Checkbox> */}
          <Checkbox name="price" value={300} onChange={handlePrice}>
            Rs 251-Rs 300
          </Checkbox>
          <Checkbox name="price" value={350} onChange={handlePrice}>
            Rs 350
          </Checkbox>
          <Checkbox name="price" value={500} onChange={handlePrice}>
           Above Rs 450
          </Checkbox>
        </VStack>
        <VStack spacing={2} align="stretch" padding="20px">
          <Text fontWeight="bold">Type</Text>
          <Checkbox  name="type" value="Polo" onChange={handleType}>Polo</Checkbox>
          <Checkbox  name="type" value="Hoodie" onChange={handleType}>Hoodie</Checkbox>
          <Checkbox  name="type" value="Basic" onChange={handleType}>Basic</Checkbox>
        </VStack>
      </Box>

      {/* --------------Right Section------------- */}

      <Box className={style.right_section}>
        <Box className={style.searchBar}>
          <Input
            onChange={(e) => handleSearch(e)}
            placeholder="Search for products..."
          />
          <HStack className={style.searchIcon}>
            <SearchIcon margin="auto" boxSize={4} color="white" />
          </HStack>
        </Box>

        {/*---------------------Products Displayed-------------------  */}

        <Box className={style.right_section1}>
          <Box className={style.card}>
            {products?.map((el) => (
              <Box className={style.box} key={el.id}>
                <Image
                  display="block"
                  m="auto"
                  width="60%"
                  h="50%"
                  src={el.imageURL}
                />
                <Text mt="10px" fontWeight="bold" textAlign="center">
                  {el.name}
                </Text>
                <Text mt="10px" fontWeight="bold" textAlign="center">
                  {"Rs " + el.price}
                </Text>
                <Button
                  display="block"
                  margin="auto"
                  color="white"
                  backgroundColor="black"
                  mt="10px"
                  fontSize="small"
                  _hover={{
                    bgColor: "green",
                  }}
                  onClick={() => handleAdd(el)}
                >
                  Add to cart
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
