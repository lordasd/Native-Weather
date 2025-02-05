const formatTime = (date: Date): string => {
    const hours = date.getHours();
    return `${String(hours).padStart(2, '0')}:00`;
};

export default formatTime;