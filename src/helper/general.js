export function currentDate(dateTime, symbol = '.') {
  if (!dateTime) return;
  const date = dateTime.split(' ')[0];
  
  if (date.includes('.')) {
    return date.split('.').join(symbol);
  }

  const [year, month, day] = date.split('-');
  return [day, month, year].join(symbol);
};

export function currentDateTime(dateTime) {
  return [currentDate(dateTime), dateTime.split(' ')[1]].join(' ');
}

export function unCurrentDate(date, symbol = '.') {
  if (!date) return;

  const [day, month, year] = date.split(symbol);
  return [year, month, day].join('-');
};

export function currentMediaLink(link) {
  return 'https://test.vdooh.com/media/' + link;
}
