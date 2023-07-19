import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { sleep } from "../../helpers/sleep";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);

  const { data } = await githubApi.get<Label[]>("/labels?per_page=100");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery([" labels"], getLabels, {
    //para que la data dure 1 hora: 1 sec * 60 secs * 60 min = hora
    // staleTime: 1000 * 60 * 60,
    // sirve para mostrar una data que se supone es la que trae ya la data pero se queda por tiempo ilimitado o por el definido
    // en el statelTime
    // initialData:[],
    // sirve para mostar info mientras la petición esta cargando
    placeholderData: [
      {
        id: 725156255,
        node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
        url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
        name: "good first issue (taken)",
        color: "b60205",
        default: false,
      },
      {
        id: 717031390,
        node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
        url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
        name: "good first issue",
        color: "6ce26a",
        default: true,
      },
    ],
    //     refetchOnWindowFocus: false, // para llamar la info cada vez que focus en la ventana
  });

  return labelsQuery; //puede regresar uno o varios
};
