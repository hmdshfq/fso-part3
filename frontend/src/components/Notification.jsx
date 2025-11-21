const Notification = ({ message, isSuccess }) => {
    if (message === null) {
        return null;
    }

    console.log({isSuccess});
    

    return <div className={`notification ${isSuccess ? 'success' : 'error'}`}>{message}</div>;
};

export default Notification;
