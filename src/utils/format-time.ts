/* eslint-disable import/no-duplicates */
import { format, getTime, formatDistanceToNow } from 'date-fns';
import ko from 'date-fns/locale/ko';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'yyyy년 MM년 dd일';

  return date ? format(new Date(date), fm, { locale: ko }) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'yyyy년 MM년 dd일 HH시 mm분';

  return date ? format(new Date(date), fm, { locale: ko }) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: ko,
      })
    : '';
}
