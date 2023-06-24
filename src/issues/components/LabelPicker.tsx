import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { useLabels } from "../hooks/useLabels";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { FC } from "react";

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {
  // FORMA 1
  // const getLabels = async () => {
  //   const res = await fetch(
  //     "https://api.github.com/repos/facebook/react/labels"
  //   );
  //   const data = await res.json();
  //   console.log(data);
  //   return data;
  // };

  // FORMA 2
  // const getLabels = async (): Promise<Label[]> => {
  //   const { data } = await githubApi.get<Label[]>("/labels");
  //   console.log(data);
  //   return data;
  // };

  // llamado FORMA 1 unido con FORMA 2
  // const labelsQuery = useQuery([" labels"], getLabels, {
  //   refetchOnWindowFocus: false, // para llamar la info cada vez que focus en la ventana
  // });

  //FORMA 3
  const labelsQuery = useLabels();

  //si es isFetching: vuelve a disparar la petición
  //si es isLoading: cuando no hay data, usualmente se
  // trabaja mas con el isLoading
  if (labelsQuery.isLoading) {
    // FORMA 1
    // return <h1>Loading...</h1>;

    //FORMA 2
    return <LoadingIcon />;
  }

  return (
    <>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker  ${
            selectedLabels.includes(label.name) ? "label-active" : ""
          }`}
          onClick={() => onChange(label.name)}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
