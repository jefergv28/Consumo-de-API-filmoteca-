import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Button, Image, Text } from "@chakra-ui/react";

interface MovieDialogProps {
  open: boolean;
  onClose: () => void;
  movie: {
    poster_path: string;
    title: string;
    release_date: string;
    genres: string[];
    overview: string;
  };
}

const MovieDialog: React.FC<MovieDialogProps> = ({ open, onClose, movie }) => {
  const genres =
    movie.genres && Array.isArray(movie.genres)
      ? movie.genres.join(", ")
      : "No disponible";

  return (
    <DialogRoot open={open}>
      {/* DialogTrigger can be used for the opening logic */}
      <DialogTrigger>
        {/* This could be a button or any clickable element */}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{movie.title}</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width="100%"
            height="auto"
            mb={4}
          />
          <Text fontSize="sm" color="gray.500">
            {movie.release_date}
          </Text>
          <Text mt={4}>{movie.overview}</Text>
          <Text mt={4} fontWeight="bold">
            Géneros:
          </Text>
          {/* Usando la variable 'genres' que ya definimos */}
          <Text>{genres}</Text>
        </DialogBody>

        <DialogFooter>
          {/* DialogCloseTrigger should be used to close the dialog */}
          <DialogCloseTrigger onClick={onClose}>
            <Button variant="outline">Cerrar</Button>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default MovieDialog;
