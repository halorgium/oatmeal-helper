import moment from 'moment'

const calculateWait = (now, finish, duration) => {
  const diff = finish.clone()
  diff.subtract(duration)
  diff.subtract(now)

  while (diff.as('seconds') < 0) {
    diff.add(1, 'day')
  }

  const days = diff.get('days')
  const hours = diff.get('hours')
  const minutes = diff.get('minutes')
  return moment.duration({ days, hours, minutes })
}

export { calculateWait }
