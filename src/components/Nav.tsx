import React, { useState, useEffect } from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { IoMenuSharp } from "react-icons/io5";

interface Category {
  id: number;
  name: string;
}

interface NavProps {
  fetchMoviesByCategory: (categoryId: number) => void;
}

const Nav: React.FC<NavProps> = ({ fetchMoviesByCategory }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Función para actualizar el ancho de la ventana
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Función para alternar el menú
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Manejo del efecto para el cambio en el tamaño de la ventana
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

    // Agregar el event listener para resize
    window.addEventListener("resize", handleResize);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Cálculo dinámico de la posición 'top' basada en el estado de isOpen y el tamaño de la ventana
  const calculateTop = () => {
    if (windowWidth > 768) {
      return "145px"; // Para pantallas grandes
    } else {
      return "70px"; // Para pantallas pequeñas
    }
  };

  if (loading) return <Text>Cargando categorías...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <>
      {/* Icono hamburguesa, solo visible en pantallas pequeñas */}
      <Box
        display={{ base: "block", md: "none" }} // Solo visible en pantallas pequeñas
        position="fixed"
        top="20px"
        left="10px"
        zIndex="1000"
        onClick={toggleMenu} // Cambiar estado al hacer clic
        cursor="pointer"
      >
        <Text fontSize="2xl">
          <IoMenuSharp />
        </Text>{" "}
      </Box>

      {/* Menú lateral, se mueve con el estado 'isOpen' */}
      <Box
        position="fixed"
        top={calculateTop()} // Llamamos a la función para obtener el top
        left={isOpen || windowWidth >= 768 ? 0 : "-250px"} // Menú se mueve según el estado
        width="250px"
        height="100vh"
        bg="#90cea1"
        p={2}
        overflowY="auto"
        transition="left 0.3s ease" // Animación de apertura y cierre
        zIndex="999"
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.75)" // Sombra para el menú
        display={windowWidth >= 768 ? "block" : isOpen ? "block" : "none"} // Mostrar siempre en pantallas grandes, y solo cuando 'isOpen' es true en pantallas pequeñas
      >
        <Text color="#01b4e4" fontSize="xl" fontWeight="bold">
          Menú Lateral
        </Text>
        <Box mt={0} fontSize={14}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.id}
                onClick={() => fetchMoviesByCategory(category.id)}
                display="block"
                p={2}
                _hover={{ bg: "#0d253f" }}
              >
                <Text fontWeight="bold" color="white">
                  {category.name}
                </Text>
              </Link>
            ))
          ) : (
            <Text>No hay categorías disponibles.</Text>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Nav;
