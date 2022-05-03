export function getCurrentWeekNumber() {
  let current_date = new Date();
  let start_date = new Date(current_date.getFullYear(), 0, 1);
  let days = Math.floor((current_date - start_date) / (24 * 60 * 60 * 1000));

  return Math.ceil((current_date.getDay() + 1 + days) / 7);
}

export function getWeekNumberFromDate(date) {
  let start_date = new Date(date.getFullYear(), 0, 1);
  let days = Math.floor((date - start_date) / (24 * 60 * 60 * 1000));

  return Math.ceil((date.getDay() + 1 + days) / 7);
}
