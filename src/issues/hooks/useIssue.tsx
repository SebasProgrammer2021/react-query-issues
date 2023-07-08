import { useQuery } from '@tanstack/react-query';
import { Issue } from '../interfaces';
import { githubApi } from '../../api/githubApi';
import { sleep } from '../../helpers/sleep';

export const getIssue = async (issueNumber: number): Promise<Issue> => {
    await sleep(2)
    const { data } = await githubApi.get(`/issues/${issueNumber}`);
    return data
}

export const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
    await sleep(2)
    const { data } = await githubApi.get(`/issues/${issueNumber}/comments`);
    return data
}

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery(
        ['issue', issueNumber], () => getIssue(issueNumber),
    )

    const issueCommentsQuery = useQuery(
        ['issue', issueNumber, 'comments'], () => getIssueComments(issueQuery.data!.number), {
        enabled: issueQuery.data !== undefined//permite habilitar o desabilitar la petición 
    }
    )


    return { issueQuery, issueCommentsQuery }
}
