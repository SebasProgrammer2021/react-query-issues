import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useState } from "react";
import { useInfiniteIssues } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { State } from "../interfaces/issue";

export const ListInfiniteView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [issueState, setIssueState] = useState<State>()
  const { issuesQuery } = useInfiniteIssues({ issueState, selectedLabels })

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
            <IssueList issues={issuesQuery.data?.pages.flat() || []}
              state={issueState}
              onStateChange={(newState) => setIssueState(newState)} />
        }

        <button className="btn btn-outline-primary mt-4" disabled={!issuesQuery.hasNextPage} onClick={() => issuesQuery.fetchNextPage()}>
          Load more
        </button>
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
