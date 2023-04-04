import dayjs from "dayjs"

export function generateDatesYTD(){
    const firstYearDate = dayjs().startOf('year')
    const today = new Date()

    const dates = []
    let compareDate = firstYearDate

    while (compareDate.isBefore(today)){
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1, 'day')
    }

    return dates
}