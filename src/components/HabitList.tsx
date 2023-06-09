import * as Checkbox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'
import { Check } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface HabitListProps {
  date: Date
  onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string, 
    title: string;
    created_at: string
  }>,
  completedHabits: string[]
}

export function HabitsList({ date, onCompletedChanged }: HabitListProps){

  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  useEffect(()=>{
    api.get('day', {
      params: {
        date: date.toISOString()
      }
    }).then(response => {
      setHabitsInfo(response.data) 
    })
  }, [])

  const isDayInPast = dayjs(date)
    .endOf('day')
    .isBefore(new Date())

  async function handleToogleHabit(habitId: string){
    await api.patch(`/habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    })

    onCompletedChanged(completedHabits.length)
  }

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitsInfo?.possibleHabits.map(habit =>{
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={()=>handleToogleHabit(habit.id)}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            disabled={isDayInPast}
            className='flex items-center gap-3 group'
          >
            <div className='h-8 w-8 flex bg-zinc-900 rounded-lg border-2 border-zinc-800 justify-center items-center group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors' >
                <Checkbox.Indicator>
                    <Check
                        size={20}
                        className="text-white"
                    />
                </Checkbox.Indicator>
            </div>
            <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                {habit.title}
            </span>
          </Checkbox.Root>
        )
      })}

      
  </div>
  )
}