import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

let initDayjs = false

function initDayjsPlugin() {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault('Asia/Tokyo')
}

export function displayDate(date: Date | string) {
  if (!initDayjs) {
    initDayjsPlugin()
    initDayjs = true
  }
  return dayjs(date).tz().format('YYYY/MM/DD')
}

export function toDate(date: string, format: string) {
  if (!initDayjs) {
    initDayjsPlugin()
    initDayjs = true
  }
  return dayjs(date, format).toDate()
}

export function displayTime(date: Date | string, visibleSecond = false) {
  return dayjs(date)
    .tz()
    .format(`HH:mm${visibleSecond ? ':ss' : ''}`)
}

// export function displayDateTime(date: Date | string, visibleSecond = false) {
//   return dayjs(date)
//     .tz()
//     .format(`YYYY/MM/DD HH:mm${visibleSecond ? ':ss' : ''}`)
// }

export function dateForFileName(date: Date | string) {
  if (!initDayjs) {
    initDayjsPlugin()
    initDayjs = true
  }
  return dayjs(date).tz().format(`YYYY_MM_DD_HH_mm_ss`)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
