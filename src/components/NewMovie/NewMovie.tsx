import './NewMovie.scss';

import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { isValid } from '../../helpers';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const requiredFields = [
    title,
    imgUrl,
    imdbUrl,
    imdbId,
  ];

  const areRequiredFieldsFilled = (): boolean => {
    return requiredFields.every(Boolean);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!areRequiredFieldsFilled()
      || !isValid(imdbUrl)
      || !isValid(imgUrl)) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(prev => prev + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        validation={isValid}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        validation={isValid}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button"
            disabled={!areRequiredFieldsFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};