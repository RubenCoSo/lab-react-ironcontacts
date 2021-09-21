import "./App.css";
import { Table } from "reactstrap";
import { Button } from "reactstrap";
import contactsData from "./contacts.json";
import { useState } from "react";

const contactsList = [...contactsData];

function App() {
  const [contacts, setContacts] = useState(contactsList.splice(0, 5));

  function addRandomContact() {
    let random = Math.floor(Math.random() * contactsList.length);

    setContacts([...contacts, contactsList[random]]);

    contactsList.splice(random, 1);
  }

  function sortPopularity() {
    const sortedContactsPopularity = []
      .concat(contacts)
      .sort((a, b) => (a.popularity > b.popularity ? 1 : -1));
    setContacts(sortedContactsPopularity);
    // setContacts(contacts.popularity.sort((a, b) => a - b));
    // console.log(contacts);
  }

  function sortName() {
    const sortedContactsName = []
      .concat(contacts)
      .sort((a, b) => a.name.localeCompare(b.name));
    setContacts(sortedContactsName);
  }

  function deleteContact(contactId) {
    const deletedContact = contacts.filter(
      (contact) => contact.id === contactId
    );
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    contactsList.push(deletedContact);

    setContacts(filteredContacts);
  }

  return (
    <div className="App">
      <h1>Ironhack Contacts</h1>
      <div>
        <Button
          color="danger"
          onClick={() => {
            addRandomContact();
          }}
        >
          Add Random Contact
        </Button>
        <Button
          color="danger"
          onClick={() => {
            sortPopularity();
          }}
        >
          Sort by Popularity
        </Button>
        <Button
          color="danger"
          onClick={() => {
            sortName();
          }}
        >
          Sort by Name
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img
                    className="contactImage"
                    src={contact.pictureUrl}
                    alt="contactPicture"
                  ></img>
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar ? "🏆" : ""}</td>
                <td>{contact.wonEmmy ? "🌟" : ""}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => {
                      deleteContact(contact.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
