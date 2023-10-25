import React, { useState, useEffect } from "react";
import { readCard, readDeck, updateCard } from "../utils/api";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardForm from "./CardForm";

function EditCard({}) {
    const {deckId, cardId} = useParams()
    const history = useHistory()

    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});

    useEffect(() => {
        const loadDeck = async () => {
            const response = await readDeck(deckId);
            setDeck(response);
        }
    
        const loadCard = async () => {
            const response = await readCard(cardId);
            setCard(response);
        }

        loadDeck();
        loadCard()
    }, [deckId, cardId]);

    const handleSubmit = async (cardFormData) => {
        await updateCard({id: card.id, front: cardFormData.front, back: cardFormData.back})
        // TODO cards don't reload
        history.push(`/decks/${deckId}`)
      }

  return (
    <React.Fragment>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
            </ol>
        </nav>
        <h1>Edit Card</h1>
        <CardForm nonSubmitButtonText="Cancel" submitFunc={handleSubmit} startFrontValue={card.front} startBackValue={card.back} deckId={deckId}/>
    </React.Fragment>
  );

    
}

export default EditCard;
