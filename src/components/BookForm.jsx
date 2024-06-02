import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
  const [book, setBook] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    title: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:4001/book/savebook', book);
      console.log('Book saved:', response.data);
      setMessage('Book saved successfully!');
      setBook({
        name: '',
        price: '',
        category: '',
        image: '',
        title: ''
      });
    } catch (error) {
      console.error('There was an error saving the book!', error);
      setMessage('Failed to save the book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        {['name', 'price', 'category', 'image', 'title'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name={field}
              value={book[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
