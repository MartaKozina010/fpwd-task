import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {Transaction} from '@prisma/client'

type PostTransactionBody = Omit<Transaction, "id" | "timestamp">

const API_URL = "/api/currency_exchange/new_transaction"
export const usePostTransaction = () => {
    const {mutate: postTransaction, isSuccess, isLoading, isError} = useMutation({
        mutationFn: async (transaction: PostTransactionBody) => await axios.post(API_URL, transaction)
    })

    return {postTransaction, isSuccess, isLoading, isError}
}