import React from "react";
import DeckSummary from "./DeckSummary";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Card({deckId, card, deleteCard}) {
  return (
    <React.Fragment>
      <p>{card.front}</p>
      <p>{card.back}</p>
      <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button>Edit</button></Link>
      <button onClick={deleteCard}>Delete</button>
    </React.Fragment>
  );
}

export default Card;
