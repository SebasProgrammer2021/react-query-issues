import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces';
import { State } from '../interfaces/issue';
import { sleep } from '../../helpers/sleep';
import { useState, useEffect } from 'react';

interface Props {
    issueState?: State;
    selectedLabels: string[];
    page?: number;
}

const getIssues = async ({ selectedLabels, issueState, page = 1 }: Props): Promise<Issue[]> => {
    await sleep(2)

    const params = new URLSearchParams()

    if (issueState) params.append('state', issueState)

    if (selectedLabels.length > 0) {
        const labelsString = selectedLabels.join(',');
        params.append('labels', labelsString);
    }

    params.append('page', page.toString())
    params.append('per_page', '5')

    const { data } = await githubApi.get<Issue[]>('/issues', { params });

    return data
}

export const useIssues = ({ issueState, selectedLabels }: Props) => {
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [issueState, selectedLabels])


    const issuesQuery = useQuery(['issues',
        { issueState, selectedLabels, page } // para manejar el cache y que no importa el orden de los elementos se utiliza asi en objeto, react query va a saber que cambio
        // y va a hacer la petición acorde a eso
    ], () => getIssues({ selectedLabels, issueState, page })
    )

    const nextPage = () => {
        if (issuesQuery.data?.length === 0) return;

        setPage(page + 1);
    }

    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    }
    return {
        issuesQuery,
        page: issuesQuery.isLoading ? "Loading" : page,
        nextPage,
        prevPage
    }
}
