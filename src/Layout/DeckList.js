import React from "react";
import DeckSummary from "./DeckSummary";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Decklist({starterDecks, deleteFunc}) {

  const removeDeck = async (id) => {
    if (window.confirm("Delete this deck?")){
      await deleteDeck(id)
      deleteFunc(id)
    }
  }

  return (
    <React.Fragment>
      <Link to="/decks/new"><button>Create Deck</button></Link>
      {starterDecks.map((deck, index) => 
        <DeckSummary key={index} deck={deck} deleteDeck={() => removeDeck(deck.id)} />
      )}
    </React.Fragment>
  );
}

export default Decklist;
