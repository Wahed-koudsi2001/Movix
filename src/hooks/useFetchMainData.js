import { FallingLines } from "react-loader-spinner"
import { useEffect } from "react";
import { useQuery } from "react-query";
import Axios from "axios";

export function useFetchMainData(url, addResult, apiKey) {
    const { data, isLoading, isError, refetch } = useQuery(["movies", url], () => {
        const mainApi = Axios.get(url, {
            params: {
                api_key: "d3d74a12285b4272bedb7e77a9998a5d",
            },
        })
            .then((res) => {
                if (addResult) {
                    return res.data.results;
                } else {
                    return res.data;
                }
            })
            .catch((error) => {
                throw new Error(`Failed to fetch data: ${error.message}`);
            });

        return mainApi;
    });

    useEffect(() => {
        refetch();
    }, [url, refetch]);

    if (isLoading) {
        return <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel='falling-lines-loading'
        />;
    }

    if (isError) {
        return <h1>{isError.message}</h1>;
    }

    return { data };
}