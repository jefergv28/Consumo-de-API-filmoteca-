import React from "react";
import { Flex, Box, Input, Button, Text } from "@chakra-ui/react";

interface HeaderProps {
  query: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({
  query,
  handleChange,
  handleSearch,
}) => {
  return (
    <Box
      position="fixed"
      zIndex="1000"
      top={0}
      left={0}
      width="100%"
      bg="#0d253f"
      p={4}
      color="#ffffff"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.75)"
    >
      <Flex justify="space-between" align="center">
        {/* Logo y texto solo visibles en pantallas grandes */}
        <Box display={{ base: "none", md: "block" }}>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
            alt="logo"
            width="180"
          />
          <Text fontSize="2xl" ml={-500} color="white">
            Filmoteca
          </Text>
        </Box>

        {/* Input y botón de búsqueda visibles siempre */}
        <Flex
          width={1000}
          justify="flex-end"
          display={{ base: "flex", md: "flex" }} // Siempre visible
        >
          <Input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Buscar película..."
            bgColor="#90cea1"
            borderRadius="5px"
            _placeholder={{ color: "#333" }}
            ml={5}
            pl={5}
          />

          <Button
            onClick={handleSearch}
            bgColor={"#fff"}
            color="#333"
            borderRadius="5px"
            ml={5}
            colorScheme="teal"
            fontSize="1.2em"
            fontWeight="bold"
            _hover={{ bgColor: "#01b4e4", color: "#fff" }}
          >
            Buscar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
