import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Layout from './Layout';
import Home from './Layout/Home';
import CreateDeck from './Layout/CreateDeck';
import StudyDeck from './Layout/StudyDeck';
import ViewDeck from './Layout/ViewDeck';
import EditDeck from './Layout/EditDeck';
import AddCard from './Layout/AddCard';
import EditCard from './Layout/EditCard';
import NotFound from './Layout/NotFound';

/**
 * App is the main component which contains the Router.
 */
function App() {
  console.log('App component rendered');
  return (
    <div className="app-routes">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeWithCreateButton />} />
          <Route path="decks/new" element={<CreateDeck />} />
          <Route path="decks/:deckId/study" element={<StudyDeck />} />
          <Route path="decks/:deckId/edit" element={<EditDeck />} />
          <Route path="decks/:deckId" element={<ViewDeck />} />
          <Route path="decks/:deckId/cards/new" element={<AddCard />} />
          <Route path="decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

// HomeWithCreateButton component to include the create button
function HomeWithCreateButton() {
  return (
    <div>
      <Link to='/decks/new'>
        <button className='btn btn-secondary'>
          <i className='fas fa-plus'></i> Create Deck
        </button>
      </Link>
      <Home />
    </div>
  );
}

export default App;