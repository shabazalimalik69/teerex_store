import { Box, Button, HStack, Image, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import style from "./Common.module.css";

const Cart = () => {
  let data = JSON.parse(localStorage.getItem("cart"));
  const toast = useToast();
  const [updatedData, setUpdatedData] = useState(data);

  let totalAmount = data.reduce((acc, el) => {
    return acc + el.qty * el.price;
  }, 0);
 
  const handleDelete = (i) => {
    data.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(data));
    toast({
      title: "Product Deleted Successfully",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
    window.location.reload(true);
  };

  const handleCount = (value, id) => {
    setUpdatedData(
      data?.map((el) => (el.id === id ? { ...el, qty: el.qty + value } : el))
    );
  };
  localStorage.setItem("cart", JSON.stringify(updatedData));

  return (
    <Box>
      <Text mt="20px" mb="20px" ml="30px">
        Shopping Cart
      </Text>
      <Box className={style.Container}>
        {updatedData?.map((el, i) => (
          <Box className={style.Card} key={el.id}>
            <Box>
              <Image w="60px" h="40px" src={el.imageURL} />
            </Box>
            <Box>
              <Text fontWeight="bold">{el.name}</Text>
              <Text fontWeight="bold">{"Rs " + el.price}</Text>
            </Box>
            <HStack mt="-40px">
              <Text fontWeight="bold">Qty</Text>
              <Button
                bg="black"
                color="white"
                _hover={{ bg: "grey" }}
                disabled={el.qty === el.quantity}
                onClick={() => handleCount(1, el.id)}
              >
                +
              </Button>
              <span>{el.qty}</span>
              <Button
                bg="black"
                color="white"
                _hover={{ bg: "grey" }}
                disabled={el.qty === 1}
                onClick={() => handleCount(-1, el.id)}
              >
                -
              </Button>
            </HStack>
            <Box>
              <Button
                bg="brown"
                color="white"
                _hover={{ bg: "red" }}
                onClick={() => handleDelete(i)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <Box>
        <Text fontWeight="bold" mt="20px" textAlign="center">
          Total Amount : Rs {totalAmount}
        </Text>
      </Box>
    </Box>
  );
};

export default Cart;
