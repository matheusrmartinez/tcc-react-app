export function GetDateFormatedFromString(stringDate: string): Date {
  const day = stringDate.substr(0, 2);
  const month = stringDate.substr(3, 2);
  const year = stringDate.substr(6, 4);

  const dateStringFormated = `${year}/${month}/${day} ${stringDate.substr(
    11,
    8,
  )}`;

  return new Date(dateStringFormated);
}

export function GetDateFormatedDateTimeFormat(stringDate: string): Date {
  const day = stringDate.substr(8, 2);
  const month = stringDate.substr(5, 2);
  const year = stringDate.substr(0, 4);

  const dateStringFormated = `${year}/${month}/${day} ${stringDate.substr(
    11,
    5,
  )}`;

  return new Date(dateStringFormated);
}
