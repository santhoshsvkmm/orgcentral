
import { parse, addDays, isWeekend, differenceInCalendarDays, isSameDay, isValid, format } from 'date-fns';

/**
 * Calculates the number of working days between two dates, excluding weekends
 * and a list of specified non-working days.
 * @param startDateString The start date in 'yyyy-MM-dd' format.
 * @param endDateString The end date in 'yyyy-MM-dd' format.
 * @param nonWorkingDateStrings An array of non-working dates in 'yyyy-MM-dd' format.
 * @returns The number of working days, or null if dates are invalid or start is after end.
 */
export function calculateWorkingDays(
  startDateString?: string,
  endDateString?: string,
  nonWorkingDateStrings: string[] = []
): number | null {
  if (!startDateString || !endDateString) {
    return null;
  }

  const startDate = parse(startDateString, 'yyyy-MM-dd', new Date());
  const endDate = parse(endDateString, 'yyyy-MM-dd', new Date());

  if (!isValid(startDate) || !isValid(endDate) || startDate > endDate) {
    return null;
  }

  const parsedNonWorkingDays = nonWorkingDateStrings
    .map(dateStr => parse(dateStr, 'yyyy-MM-dd', new Date()))
    .filter(isValid);

  let workingDays = 0;
  let currentDate = startDate;

  const totalDays = differenceInCalendarDays(endDate, startDate) + 1;

  for (let i = 0; i < totalDays; i++) {
    currentDate = addDays(startDate, i);
    
    const isNonWorking = parsedNonWorkingDays.some(nwDate => isSameDay(currentDate, nwDate));
    
    if (!isWeekend(currentDate) && !isNonWorking) {
      workingDays++;
    }
  }

  return workingDays;
}

/**
 * Formats a date string (YYYY-MM-DD) into a more readable format.
 * @param dateString The date string to format.
 * @param outputFormat The desired output format (defaults to 'MMM d, yyyy').
 * @returns Formatted date string or 'N/A' if input is invalid.
 */
export function formatDate(dateString?: string, outputFormat = 'MMM d, yyyy'): string {
  if (!dateString) return 'N/A';
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  if (!isValid(date)) return 'N/A';
  return format(date, outputFormat);
}
