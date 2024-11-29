const ContactForm = ({
    newName,
    newNumber,
    handleSubmit,
    handleNameChange,
    handleNumberChange,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <p>
                    <label htmlFor="name">Name: </label>
                    <input
                        id="name"
                        value={newName}
                        onChange={handleNameChange}
                    />
                </p>
                <p>
                    <label htmlFor="number">Number: </label>
                    <input
                        id="number"
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </p>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

export default ContactForm;
