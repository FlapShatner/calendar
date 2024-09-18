import React, { useEffect } from 'react'
import { CalendarEvent, ColorOption } from '@/types/types'
import 'react-datepicker/dist/react-datepicker.css'
import { useQuery } from '@tanstack/react-query'
import { fetchEvent } from '@/app/resource/events'
import DateRange from '../inputs/date-range'
import AllDay from '../inputs/all-day'
import Time from '../inputs/time'
import Summary from '../inputs/summary'
import Description from '../inputs/description'
import Location from '../inputs/location/location'
import Submit from '../inputs/submit'
import dayjs from '@/app/lib/dayjs'
import { useNewEventStore } from '@/app/lib/zustand/store'

function EditContent({ color }: { color: ColorOption }) {
 const eventId = useNewEventStore((state) => state.eventId)
 const setSummary = useNewEventStore((state) => state.setSummary)
 const setDescription = useNewEventStore((state) => state.setDescription)
 const setLocation = useNewEventStore((state) => state.setLocation)
 const setStartDate = useNewEventStore((state) => state.setStartDate)
 const setEndDate = useNewEventStore((state) => state.setEndDate)
 const setStartTime = useNewEventStore((state) => state.setStartTime)
 const setEndTime = useNewEventStore((state) => state.setEndTime)
 const setAllDay = useNewEventStore((state) => state.setAllDay)

 const eventQuery = useQuery({
  queryKey: ['event', eventId],
  queryFn: ({ queryKey }) => fetchEvent(queryKey[1] as string),
  refetchOnWindowFocus: false,
 })

 useEffect(() => {
  const { data, isSuccess } = eventQuery
  console.log(data?.start?.date)
  if (isSuccess) {
   const startDate = data?.start?.date ? new Date(data.start.date) : new Date()
   const endDate = data?.end?.date ? new Date(data.end.date) : new Date()
   console.log('useeffect', startDate, endDate)
   setSummary(data.summary ?? '')
   setDescription(data.description ?? '')
   setLocation(data.location ?? '')
   setStartDate(startDate)
   setEndDate(endDate)
   setStartTime(data?.start?.dateTime ?? '')
   setEndTime(data?.end?.dateTime ?? '')
   setAllDay(data?.start?.dateTime ? false : true)
  }
 }, [eventQuery])

 return (
  <div>
   <h2 className='text-2xl pt-5  z-50 relative text-center'>Edit Event</h2>
   <div
    style={{ backgroundColor: color.value }}
    className='absolute top-[32px] left-8 right-[54px] bottom-4 rounded-[60px]'
   />
   <div className='z-50 relative pl-2 pr-4 pt-2 '>
    <form
     style={{
      scrollbarWidth: 'thin',
      scrollbarColor: `${color.value} transparent`,
     }}
     className='bg-black h-[300px] mr-[14px] px-2 overflow-y-scroll flex flex-col'>
     <Summary />
     <DateRange />
     <div className='flex gap-2 items-center mt-2'>
      <Time pos='start' />
      <Time pos='end' />
      <AllDay />
     </div>
     <Description />
     <Location />
     <Submit />
    </form>
   </div>
  </div>
 )
}

export default EditContent
