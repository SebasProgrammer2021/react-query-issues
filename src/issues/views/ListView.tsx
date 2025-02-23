import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useState } from "react";
import { useIssues } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { State } from "../interfaces/issue";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [issueState, setIssueState] = useState<State>()
  const { issuesQuery, page, nextPage, prevPage } = useIssues({ issueState, selectedLabels })

  const onLabelChange = (labelName: string) => {
    // si existe lo remuevo o sino lo agrego
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);

    console.log(selectedLabels);

  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {
          issuesQuery.isLoading ?
            <LoadingIcon /> :
            <IssueList issues={issuesQuery.data || []}
              state={issueState}
              onStateChange={(newState) => setIssueState(newState)} />
        }

        <div className="d-flex mt-2 justify-content-between">
          <button className="btn btn-outline-primary" disabled={issuesQuery.isFetching} onClick={prevPage}>Prev</button>
          <span>{page}</span>
          <button className="btn btn-outline-primary" disabled={issuesQuery.isFetching} onClick={nextPage}>Next</button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
