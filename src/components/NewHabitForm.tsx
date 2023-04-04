import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { CheckboxElement } from "./Checkbox";

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]

export function NewHabitForm() {
    const [title, setTitle] = useState('')

    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createNewHabit(event: FormEvent) {
        event.preventDefault()

        if (!title || weekDays.length === 0) {
            return
        }

        await api.post('/habits', {
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])


        alert('Hábito criado com sucesso!')
    }

    function handleToogleWeekDay(weekDay: number) {
        if (weekDays.includes(weekDay)) {
            const removedWeekDaysList = weekDays.filter(day => day !== weekDay)
            setWeekDays(removedWeekDaysList)
        } else {
            const addedWeekDaysList = [...weekDays, weekDay]
            setWeekDays(addedWeekDaysList)
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual o seu comprometimento?
            </label>
            <input
                type="text"
                id="title"
                placeholder="ex.: Exercícios, dormir bem..."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className="flex flex-col gap-2 mt-3">
                {
                    availableWeekDays.map((weekDay, index) => {
                        return (

                            <Checkbox.Root
                                key={weekDay}
                                checked={weekDays.includes(index)}
                                onCheckedChange={() => handleToogleWeekDay(index)}
                                className='flex items-center gap-3 group'
                            >
                                <div className='h-8 w-8 flex bg-zinc-900 rounded-lg border-2
                                 border-zinc-800 justify-center items-center group-data-[state=checked]:bg-green-500 
                                 group-data-[state=checked]:border-green-500 transition-colors' >
                                    <Checkbox.Indicator>
                                        <Check
                                            size={20}
                                            className="text-white"
                                        />
                                    </Checkbox.Indicator>
                                </div>
                                <span className="text-white leading-tight">
                                    {weekDay}
                                </span>
                            </Checkbox.Root>
                        )
                    })
                }

            </div>

            <button type="submit" className="mt-6 bg-green-600 rounded-lg flex gap-3 items-center font-semibold justify-center p-4 hover:bg-green-500 transition-colors">
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}