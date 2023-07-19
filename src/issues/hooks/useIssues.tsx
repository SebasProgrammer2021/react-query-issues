import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces';
import { State } from '../interfaces/issue';
import { sleep } from '../../helpers/sleep';

interface Props {
    issueState?: State;
    selectedLabels: string[];
}

const getIssues = async (labels: string[], state?: State): Promise<Issue[]> => {
    await sleep()

    const params = new URLSearchParams()

    if (state) params.append('state', state)

    if (labels.length > 0) {
        const labelsString = labels.join(',');
        params.append('labels', labelsString);
    }

    params.append('page', '1')
    params.append('per_page', '5')

    const { data } = await githubApi.get<Issue[]>('/issues', { params });

    return data
}

export const useIssues = ({ issueState, selectedLabels }: Props) => {
    const issuesQuery = useQuery(['issues',
        { issueState, selectedLabels } // para manejar el cache y que no importa el orden de los elementos react query va a saber que cambio
        // y va a hacer la petición acorde a eso
    ], () => getIssues(selectedLabels, issueState)
    )
    return { issuesQuery }
}
