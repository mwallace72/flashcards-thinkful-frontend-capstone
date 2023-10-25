import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function EditDeck() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const history = useHistory()

    const {deckId} = useParams()

    const [deck, setDeck] = useState({});

    useEffect(() => {
        loadDeck();
    }, [deckId]);

    const loadDeck = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
      setName(response.name)
      setDescription(response.description)
    }

    const handleNameChange = (event) => setName(event.target.value);

    const handleDescChange = (event) => setDescription(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitted:", name, description);
        const response = await updateDeck({name, description, id: deck.id})
        setName("");
        setDescription("");
        // TODO: not reloading
        goToDeck()
      };
      
      const goToDeck = () => {
        history.push(`/decks/${deck.id}`)
      }

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form name="create">
          <label htmlFor="name">
              Name
              <input type="text" id="name" name="name" onChange={handleNameChange} value={name}/>
          </label>
          <label htmlFor="description">
              Description
              <textarea id="description" name="description" onChange={handleDescChange} value={description}/>
          </label>
          <button onClick={goToDeck}>Cancel</button>
          <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </React.Fragment>
  );
}

export default EditDeck;
