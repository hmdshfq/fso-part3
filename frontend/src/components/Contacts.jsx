import contactsService from '../services/contacts';

const Contacts = ({ persons, setPersons, setMessage }) => {
    const handleDelete = (id, name) => {
        const shouldDelete = window.confirm(`Delete ${name}`);
        if (shouldDelete) {
            contactsService
                .remove(id);
            setPersons(persons.filter(person => person.id !== id))
            setMessage(`Deleted ${name}`)
            setTimeout(()=>{
                setMessage(null)
            }, 5000)
        }
    }
    return persons.map((person) => (
        <div key={person.name}>
            {person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
        </div>
    ));
};

export default Contacts;
