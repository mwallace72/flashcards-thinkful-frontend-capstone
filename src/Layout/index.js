import React, {useEffect, useState} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import {Switch, Route} from 'react-router-dom'
import {listDecks} from '../utils/api/index'
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";

function Layout() {
  const [starterDecks, setStarterDecks] = useState([])

  useEffect(() => {
    const loadDecks = async () => {
      const response = await listDecks();
      setStarterDecks(response);
    }

    loadDecks();
  }, []);

  const addDeck = (value) => {
    setStarterDecks([...starterDecks, value])
  }

  const removeDeck = (id) => {
    const dupeDecks = [...starterDecks]
    const index = dupeDecks.findIndex(deck => deck.id === id)
    if (index > -1) {
      dupeDecks.splice(index, 1)
    }
    setStarterDecks(dupeDecks)
  }

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList starterDecks={starterDecks} deleteFunc={removeDeck}/>
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck updateDecks={addDeck}/>
          </Route>
          <Route path="/decks/:deckId">
            <Deck deleteDeckFunc={removeDeck}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
