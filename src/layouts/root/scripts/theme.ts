import type { ImageMetadata } from 'astro'
import BATLOGO from '../assets/batlogo.png'

interface TriggerDate {
  /** Numeric value representhing the month, 1-indexed */
  month: number

  /** Numeric value representhing the day of the month, 1-indexed */
  day: number
}

interface ThemeTriggerBase {
  /** Image metadata to update header logo */
  logo: ImageMetadata

  /** Theme value to apply */
  theme: string
}

type ThemeTrigger = ({
  /** First day of the event */
  start: TriggerDate

  /** Last day of the event */
  end: TriggerDate
} | {
  /** Date of single-day event */
  date: TriggerDate
}) & ThemeTriggerBase

/** Create simplified date from a trigger date object or another date. Only takes into account the month and its day. */
function createMonthDate(source: TriggerDate | Date) {
  const date = new Date(0)

  if (source instanceof Date) {
    date.setMonth(source.getMonth())
    date.setDate(source.getDate())
  } else {
    date.setMonth(source.month - 1)
    date.setDate(source.day)
  }

  return date
}

/** Check if provided date is in the specified range. Supports ranges spanning from one year to another. */
function isDateInRange(start: TriggerDate, end: TriggerDate, nowDays: Date) {
  const startDays = createMonthDate(start)
  const endDays = createMonthDate(end)

  if (endDays < startDays) {
    // Check if date is in spanning range ![*****]..x..[*****]
    return !(endDays < nowDays && nowDays < startDays)
  }

  // Check if date is in regular range .....[**x**].....
  return startDays <= nowDays && nowDays <= endDays
}

function initTheme(triggers: ThemeTrigger[]) {
  const today = createMonthDate(new Date())

  const trigger = triggers.find((trigger) => {
    if ('date' in trigger) {
      return createMonthDate(trigger.date).getTime() === today.getTime()
    } else {
      return isDateInRange(trigger.start, trigger.end, today)
    }
  })

  if (!trigger) return

  document.body.dataset.theme = trigger.theme

  const logoElement = document.getElementById('header-logo')

  if (logoElement instanceof HTMLImageElement) {
    logoElement.src = trigger.logo.src
    logoElement.width = trigger.logo.width
    logoElement.height = trigger.logo.height
  }
}

// Uncomment when applying any chnanges to test isDateInRange
/* const month = 12
const day = 15
const today = createMonthDate({ month, day })

console.log('out of range =', false)
console.log('in range =', true);

([
  [+1, +2, 'Regular range - out of range'],
  [-1, +1, 'Regular range - in range, between'],
  [+0, +1, 'Regular range - in range, at the start'],
  [-1, +0, 'Regular range - in range, at the end'],

  [+1, -1, 'Inverted range - out of range'],
  [+2, +1, 'Inverted range - in range, between'],
  [+0, -1, 'Inverted range - in range, at the start'],
  [+1, +0, 'Inverted range - in range, at the end'],
] satisfies [startOffset: number, endOffset: number, label: string][]).forEach(([startOffset, endOffset, label]) => {
  console.log(label, isDateInRange({ month, day: day + startOffset }, { month, day: day + endOffset }, today))
}) */

initTheme([
  {
    // Halloween
    date: { month: 10, day: 31 },
    theme: 'bat',
    logo: BATLOGO,
  },
  /* {
    // TODO Winter
    start: { month: 12, day: 1 },
    end: { month: 2, day: 29 },
    value: 'winter',
    logo: WINTERLOGO,
  }, */
])
