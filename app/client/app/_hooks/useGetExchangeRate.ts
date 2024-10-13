import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const API_URL = "/api/currency_exchange/exchange_rate"
export const useGetExchangeRate = () => {
    const {data: exchangeRate, isLoading, error} = useQuery<number>({
        queryKey: ['exchangeRate'],
        queryFn: async () => await axios.get(API_URL).then(res => res.data),
        refetchInterval: 5000,
        //polling every eg. 5sec
    })

    return {exchangeRate, isLoading, error}
}