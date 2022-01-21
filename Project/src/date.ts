export const newDate = (date: Date, deltaDays: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + deltaDays);

  export const lastDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 2, 0);
  export const pad = (v: string | number): string =>
  `0${v}`.slice(-2);
  export const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;