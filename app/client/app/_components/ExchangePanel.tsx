'use client';

import {FC} from "react";
import {ExchangeForm} from "./ExchangeForm";
import {Card} from "@/components/ui/card";
import {useGetExchangeRate} from "@/app/_hooks";
import {Skeleton} from "@/components/ui/skeleton";

export const ExchangePanel: FC = () => {
    const {exchangeRate} = useGetExchangeRate()
    //isLoading and error have to be handled as well

    return (
        <Card className="max-w-[400px] p-6 mx-auto mt-10">
            <p className="text-m font-semibold">Current exchange rate is:</p>
            <p className="text-xl font-semibold mb-5">1 EUR = {exchangeRate || "?"} PLN</p>
            {exchangeRate ? <ExchangeForm exchangeRate={exchangeRate}/> :
                <Skeleton className="w-[350px] h-[204px] rounded-md"/>}
        </Card>

    )
}