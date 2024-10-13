'use client'

import {FC, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {usePostTransaction} from "@/app/_hooks";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";

const FormSchema = z.object({
    eurAmount: z.coerce.number().positive(),
})
type FormValues = z.infer<typeof FormSchema>

export const ExchangeForm: FC<{ exchangeRate: number }> = ({exchangeRate}) => {
    const form = useForm<FormValues>({
        defaultValues: {
            eurAmount: 1,
        },
        resolver: zodResolver(FormSchema),
        mode: "onSubmit"
    })
    const eurAmount = form.watch("eurAmount")
    const {postTransaction, isLoading, isSuccess, isError} = usePostTransaction()

    const onSubmit: SubmitHandler<FormValues> = ({eurAmount}) => {
        postTransaction({eurAmount, plnAmount, exchangeRate})
    }

    const [plnAmount, setPlnAmount] = useState(eurAmount * exchangeRate)
    const [isTextVisible, setIsTextVisible] = useState(false)

    useEffect(() => {
        if (isSuccess) {
            form.reset()
        }

        if (isSuccess || isError) {
            setIsTextVisible(true)
        }
        setTimeout(() => {
            setIsTextVisible(false)
        }, 2000)
    }, [isSuccess, isError])

    useEffect(() => {
        setPlnAmount(+(eurAmount * exchangeRate).toFixed(2))
    }, [eurAmount, exchangeRate]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="eurAmount"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Amount in EUR</FormLabel>
                            <FormControl>
                                <Input {...field}
                                       placeholder="0 EUR"
                                       type="number"
                                       className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="space-y-2">
                    <Label>Amount in PLN</Label>
                    <Input
                        placeholder="0 PLN"
                        value={plnAmount}
                        disabled
                    />
                </div>
                <Button type="submit" disabled={isLoading}>Give me my PLN</Button>
                {isTextVisible && isSuccess &&
                    <div className="text-center text-m font-semibold text-green-600">Exchanged!</div>}
                {isTextVisible && isError &&
                    <div className="text-center text-m font-semibold text-red-600">Something went wrong :(</div>}
            </form>
        </Form>
    )
}
