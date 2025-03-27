export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Date(date).toLocaleDateString(undefined, options);
};

export const formatShortDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric'
  };
  
  return new Date(date).toLocaleDateString(undefined, options);
};

export const getDaysInRange = (startDate: Date, endDate: Date): Date[] => {
  const days: Date[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
};

export const getLastNDays = (n: number): Date[] => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (n - 1));
  
  return getDaysInRange(startDate, endDate);
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};