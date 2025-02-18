import React, { useState } from "react";
import { Box, Grid, Text, Skeleton } from "@chakra-ui/react";
import { Movie } from "../App";
import MovieDialog from "./MovieDialog"; // Importamos el componente MovieDialog

interface MainProps {
  loading: boolean;
  error: string | null;
  movies: Movie[];
  style?: React.CSSProperties;
}

const Main: React.FC<MainProps> = ({ loading, error, movies }) => {
  // Estado para controlar el modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Función para abrir el modal y seleccionar la película
  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Box bg={"#01b4e4"} flex="1" p={4} mt={"110px"} ml={-5}>
      {error && <Text color="red.500">{error}</Text>}

      {/* Mostrar Skeleton si está cargando */}
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {loading
          ? // Boceto de las tarjetas mientras cargan
            Array.from({ length: 10 }).map((_, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
              >
                <Skeleton height="350px" width="100%" />
                <Box p={4}>
                  <Skeleton height="20px" mb={2} />
                  <Skeleton height="15px" width="60%" />
                </Box>
              </Box>
            ))
          : // Mostrar las películas una vez cargados los datos
            movies.map((movie) => (
              <Box
                mt={10}
                key={movie.imdb_id}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                onClick={() => handleOpenModal(movie)} // Al hacer click en una película, abrimos el modal
                cursor="pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <Box p={4}>
                  <Text fontSize="xl">{movie.title}</Text>
                  <Text fontSize="sm">{movie.release_date}</Text>
                </Box>
              </Box>
            ))}
      </Grid>

      {/* Modal de película */}
      {selectedMovie && (
        <MovieDialog
          open={isOpen}
          onClose={handleCloseModal}
          movie={selectedMovie}
        />
      )}
    </Box>
  );
};

export default Main;
