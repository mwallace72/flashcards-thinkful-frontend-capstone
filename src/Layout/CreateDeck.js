import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom";

function CreateDeck({updateDecks}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const history = useHistory()

    const handleNameChange = (event) => setName(event.target.value);

    const handleDescChange = (event) => setDescription(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitted:", name, description);
        const response = await createDeck({name, description})
        // updateDecks(response)
        setName("");
        setDescription("");
        history.push(`/decks/${response.id}`)
      };

  return (
    <React.Fragment>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
        </nav>
        <h1>Create Deck</h1>
        <form name="create">
            <label htmlFor="name">
                Name
                <input type="text" id="name" name="name" onChange={handleNameChange} value={name}/>
            </label>
            <label htmlFor="description">
                Description
                <textarea id="description" name="description" onChange={handleDescChange} value={description}/>
            </label>
            <Link to="/"><button>Cancel</button></Link>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    </React.Fragment>
  );
}

export default CreateDeck;
