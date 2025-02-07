const formatTime = (date: Date | undefined) => {
    if (!date) return 'N/A'; // Return 'N/A' if date is undefined
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

export default formatTime;