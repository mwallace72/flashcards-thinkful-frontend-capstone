import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardForm from "./CardForm";

function AddCard({}) {
    const {deckId} = useParams()

    const [deck, setDeck] = useState({});

    useEffect(() => {
        const loadDeck = async () => {
            const response = await readDeck(deckId);
            setDeck(response);
        }

        loadDeck();
    }, [deckId]);

    const handleSubmit = async (cardFormData) => {
        console.log(deckId, cardFormData, 'create');
        await createCard(deckId, cardFormData)
        // TODO decks don't reload on Done
      };

  return (
    <React.Fragment>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>
        <h1>{deck.name}: Add Card</h1>
        <CardForm nonSubmitButtonText="Done" submitFunc={handleSubmit} startFrontValue={""} startBackValue={""} deckId={deckId}/>
    </React.Fragment>
  );
}

export default AddCard;
