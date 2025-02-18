import React, { useState } from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Header from "./components/Header"; // Asegúrate de importar Header
import { Box, Grid } from "@chakra-ui/react"; // Chakra UI para Grid

export interface Movie {
  imdb_id: string;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genres: string[];
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Para manejar la búsqueda
  const [query, setQuery] = useState<string>("");

  // Maneja el cambio en el campo de búsqueda
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Maneja la búsqueda
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=58ca62521bdd3add25f1088607679dca&query=${query}`
      );
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error al buscar películas:", error);
      setError("Hubo un problema al realizar la búsqueda");
      setLoading(false);
    }
  };

  const fetchMoviesByCategory = async (categoryId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=58ca62521bdd3add25f1088607679dca&with_genres=${categoryId}`
      );
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      setError("Hubo un problema al cargar las películas");
      setLoading(false);
    }
  };

  return (
    <Grid
      templateColumns={{
        base: "1fr", // En pantallas pequeñas solo 1 columna
        sm: "250px 1fr", // A partir de 480px, el nav es 250px y el main ocupa el resto
        md: "250px 1fr", // A partir de 768px, el layout sigue igual
        lg: "250px 1fr", // A partir de 1024px, el layout sigue igual
      }}
      templateRows="auto 1fr" // Mantener el header en la parte superior
      minHeight="100vh"
      gap={4} // Agrega un espacio entre las columnas
    >
      {/* Header en la parte superior */}
      <Box gridColumn="span 2">
        <Header
          query={query}
          handleChange={handleChange}
          handleSearch={handleSearch}
        />
      </Box>

      {/* Nav en el lateral */}
      <Box>
        <Nav fetchMoviesByCategory={fetchMoviesByCategory} />
      </Box>

      {/* Main ocupando el resto del espacio */}
      <Box gridColumn="span 1">
        <Main
          loading={loading}
          error={error}
          movies={movies}
          style={{
            marginTop: "80px",
            height: "calc(100vh - 80px)",
            overflowY: "auto",
          }}
        />
      </Box>
    </Grid>
  );
};

export default App;
