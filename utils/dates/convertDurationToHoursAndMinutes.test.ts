import { expect, test } from 'vitest'
import {
  convertDurationToHoursAndMinutes,
  combineDateAndTime,
} from './convertDurationToHoursAndMinutes'

test('convertDurationToHoursAndMinutes', () => {
  const input = 7500
  const expectedOutput = { hours: 2, minutes: 5 }

  const result = convertDurationToHoursAndMinutes(input)
  expect(result).toEqual(expectedOutput)
})

test('combineDateAndTime', () => {
  const dateTimestamp = 1679474326
  const timeTimestamp = 1679474326
  const expectedOutput: [number, number, number, number, number] = [
    2023, 3, 22, 4, 38,
  ]

  const result = combineDateAndTime(1679474326, 1679474326)
  expect(result).toEqual(expectedOutput)
})
