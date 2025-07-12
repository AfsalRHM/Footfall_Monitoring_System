import { format } from "date-fns";

// Live filler for last n minutes
const fillMissingMinutes = <T extends { _id: any; total: number }>(
  rawData: T[],
  minutes: number
): { label: string; total: number }[] => {
  const now = new Date();
  const result = [];

  for (let i = minutes - 1; i >= 0; i--) {
    const currentMinute = new Date(now.getTime() - i * 60 * 1000);

    const y = currentMinute.getFullYear();
    const m = currentMinute.getMonth() + 1;
    const d = currentMinute.getDate();
    const h = currentMinute.getHours();
    const min = currentMinute.getMinutes();

    const match = rawData.find(
      (item) =>
        item._id.year === y &&
        item._id.month === m &&
        item._id.day === d &&
        item._id.hour === h &&
        item._id.minute === min
    );

    result.push({
      label: format(currentMinute, "hh:mm a"), // e.g., 02:01 PM
      total: match ? match.total : 0,
    });
  }

  return result;
};

// Daily filler for last N days
const fillMissingDays = <T extends { _id: any; total: number }>(
  rawData: T[],
  days: number
): { label: string; total: number }[] => {
  const today = new Date();
  const result = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    const match = rawData.find(
      (item) =>
        item._id.year === y && item._id.month === m && item._id.day === d
    );

    result.push({
      label: format(new Date(y, m - 1, d), "MMM d"),
      total: match ? match.total : 0,
    });
  }

  return result;
};

// Hourly filler for last N hours
const fillMissingHours = <T extends { _id: any; total: number }>(
  rawData: T[],
  hours: number
): { label: string; total: number }[] => {
  const result = [];

  for (let i = hours - 1; i >= 0; i--) {
    const date = new Date(Date.now() - i * 60 * 60 * 1000);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();

    const match = rawData.find(
      (item) =>
        item._id.year === y &&
        item._id.month === m &&
        item._id.day === d &&
        item._id.hour === h
    );

    result.push({
      label: `${format(new Date(y, m - 1, d, h), "hh a")} - ${format(
        new Date(y, m - 1, d, h + 1),
        "hh a"
      )}`,
      total: match ? match.total : 0,
    });
  }

  return result;
};

export default {
  fillMissingMinutes,
  fillMissingDays,
  fillMissingHours,
};
