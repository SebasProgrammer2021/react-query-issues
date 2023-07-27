import { useInfiniteQuery } from "@tanstack/react-query"
import { Issue, State } from "../interfaces/issue";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";

interface Props {
  issueState?: State;
  selectedLabels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];

}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProps): Promise<Issue[]> => {
  const [, , args] = queryKey;
  const { issueState, selectedLabels } = args as Props;

  await sleep(2)

  const params = new URLSearchParams()

  if (issueState) params.append('state', issueState)

  if (selectedLabels.length > 0) {
    const labelsString = selectedLabels.join(',');
    params.append('labels', labelsString);
  }

  params.append('page', pageParam.toString())
  params.append('per_page', '5')

  const { data } = await githubApi.get<Issue[]>('/issues', { params });

  return data
}


export const useInfiniteIssues = ({ issueState, selectedLabels }: Props) => {

  const issuesQuery = useInfiniteQuery(
    ['issues', 'infinite', { issueState, selectedLabels }],
    (data) => getIssues(data), {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return;
      return pages.length + 1
    }
  }
  );

  return { issuesQuery }
}
