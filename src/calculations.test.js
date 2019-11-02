import moment from 'moment'
import { calculateWait } from './calculations'

describe('calculateWait', () => {
  it('returns no wait', () => {
    const now = moment.duration('01:00')
    const finish = moment.duration('09:00')
    const duration = moment.duration('08:00')

    expect(calculateWait(now, finish, duration)).toEqual(moment.duration('00:00'))
  })

  it('returns 1 hour', () => {
    const now = moment.duration('02:00')
    const finish = moment.duration('05:00')
    const duration = moment.duration('02:00')

    expect(calculateWait(now, finish, duration)).toEqual(moment.duration('01:00'))
  })

  it('returns 23 hours', () => {
    const now = moment.duration('00:20')
    const finish = moment.duration('23:40')
    const duration = moment.duration('00:20')

    expect(calculateWait(now, finish, duration)).toEqual(moment.duration('23:00'))
  })

  it('returns positive values when crossing midnight', () => {
    const now = moment.duration('20:20')
    const finish = moment.duration('03:40')
    const duration = moment.duration('01:20')

    expect(calculateWait(now, finish, duration)).toEqual(moment.duration('06:00'))
  })

  it('returns positive values when crossing midnight twice', () => {
    const now = moment.duration('12:42')
    const finish = moment.duration('08:00')
    const duration = moment.duration('19:30')

    expect(calculateWait(now, finish, duration)).toEqual(moment.duration('23:48'))
  })
})
