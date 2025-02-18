import React, { useEffect, useState } from "react";
import { Box, Text, Link, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HamburgerIcon } from "@chakra-ui/icons"; // Asegúrate de importar el ícono

interface Category {
  id: number;
  name: string;
}

interface NavProps {
  fetchMoviesByCategory: (categoryId: number) => void;
}

const MotionBox = motion(Box);

const ResponsiveMenu: React.FC<NavProps> = ({ fetchMoviesByCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Cargar categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=58ca62521bdd3add25f1088607679dca&language=en-US"
        );
        const data = await response.json();
        setCategories(data.genres || []);
        setLoading(false);
      } catch (error) {
        setError("Hubo un problema al cargar las categorías");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Text>Cargando categorías...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <>
      {/* Botón hamburguesa visible solo en pantallas pequeñas */}
      <IconButton
        aria-label="Menu"
        position="fixed"
        top="20px"
        left="20px"
        zIndex="1000"
        display={{ base: "block", md: "none" }}
        onClick={toggleMenu}
      >
        <HamburgerIcon />
      </IconButton>

      {/* Menú lateral tradicional para pantallas grandes */}
      <Box
        position="fixed"
        top="100px"
        left={0}
        width="250px"
        height="100vh"
        bg="#90cea1"
        p={4}
        overflowY="auto"
        display={{ base: "none", md: "block" }} // Solo visible en pantallas grandes
      >
        <Text color={"#01b4e4"} fontSize="xl" fontWeight="bold">
          Menú Lateral
        </Text>
        <Box mt={1}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.id}
                onClick={() => fetchMoviesByCategory(category.id)}
                display="block"
                p={2}
                _hover={{ bg: "#0d253f" }}
              >
                <Text fontWeight="bold" color={"white"}>
                  {category.name}
                </Text>
              </Link>
            ))
          ) : (
            <Text>No hay categorías disponibles.</Text>
          )}
        </Box>
      </Box>

      {/* Menú lateral que se desplaza para pantallas pequeñas */}
      <MotionBox
        position="fixed"
        top={0}
        left={isOpen ? 0 : "-250px"}
        width="250px"
        height="100vh"
        bg="#90cea1"
        p={4}
        overflowY="auto"
        zIndex="999"
        transition={{
          type: "tween",
          duration: 0.3,
          ease: "easeInOut",
        }}
        display={{ base: "block", md: "none" }} // Solo visible en pantallas pequeñas
      >
        <Text color={"#01b4e4"} fontSize="xl" fontWeight="bold">
          Menú Lateral
        </Text>
        <Box mt={1}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.id}
                onClick={() => fetchMoviesByCategory(category.id)}
                display="block"
                p={2}
                _hover={{ bg: "#0d253f" }}
              >
                <Text fontWeight="bold" color={"white"}>
                  {category.name}
                </Text>
              </Link>
            ))
          ) : (
            <Text>No hay categorías disponibles.</Text>
          )}
        </Box>
      </MotionBox>
    </>
  );
};

export default ResponsiveMenu;
