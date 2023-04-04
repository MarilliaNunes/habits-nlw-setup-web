import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

interface Props {
    labelStyle: string
    label: string
}

export function CheckboxElement({ label, labelStyle }: Props) {

    return (
        <Checkbox.Root
            className='flex items-center gap-3 group'
        >
            <div className='h-8 w-8 flex bg-zinc-900 rounded-lg border-2 border-zinc-800 justify-center items-center group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500' >
                <Checkbox.Indicator>
                    <Check
                        size={20}
                        className="text-white"
                    />
                </Checkbox.Indicator>
            </div>
            <span className={labelStyle}>
                {label}
            </span>
        </Checkbox.Root>
    )
}