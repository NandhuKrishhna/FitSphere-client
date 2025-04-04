const useAppointmentsDetails = () => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
        }).format(date)
    }

    const formatTime = (timeString: string) => {
        const date = new Date(timeString)
        return new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(date)
    }
    return { formatDate, formatTime }

}
export default useAppointmentsDetails