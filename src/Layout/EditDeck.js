import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';

// Component for edit deck component
function EditDeck() {
  const mountedRef = useRef(false);
  const initialState = { name: '', description: '' };
  const [editDeckFormData, setEditDeckFormData] = useState(initialState);

  const { deckId } = useParams();
  const navigate = useNavigate();

  // effect for mounted ref changes
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // effect to grab deck information from server
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        if (mountedRef.current) {
          setEditDeckFormData(() => loadedDeck);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }

    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  // Handlers
  const changeHandler = ({ target }) => {
    setEditDeckFormData((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await updateDeck(editDeckFormData);
    navigate(`/decks/${response.id}`);
  };

  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <i className='fas fa-home'></i> Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to={`/decks/${deckId}`}>
              {editDeckFormData.name ? editDeckFormData.name : 'Loading...'}
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Edit Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler}>
        <h1 className='my-4 text-left'>Edit Deck</h1>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            name='name'
            id='name'
            className='form-control form-control-lg'
            type='text'
            placeholder='Deck Name'
            onChange={changeHandler}
            value={editDeckFormData.name}
            required
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            className='form-control'
            id='description'
            name='description'
            rows='5'
            placeholder='Brief description of the deck'
            onChange={changeHandler}
            value={editDeckFormData.description}
            required
          ></textarea>
        </div>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => navigate(`/decks/${deckId}`)}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;