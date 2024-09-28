export const Time = {
  oneHour: 60 * 60,
  threeHours: 3 * 60 * 60,
  fiveHours: 5 * 60 * 60,
  customHours: function (h: number) {
    return h * 60 * 60
  },
  oneDay: 24 * 60 * 60,
  oneWeek: 7 * 24 * 60 * 60,
  customDays: function (d: number) {
    return d * 24 * 60 * 60
  },
}
