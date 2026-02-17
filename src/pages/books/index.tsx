import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

interface Book {
  id: string;
  title: string;
  author: string;
  available: boolean;
}

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all')

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);


  const filteredBooks = books.filter(book => {
    const authorMatch = book.author.toLowerCase().includes(filter.toLowerCase());
    const availabilityMatch = 
    availabilityFilter === 'all' ||
    (availabilityFilter === 'available' && book.available) ||
    (availabilityFilter === 'unavailable' && !book.available);
    return authorMatch && availabilityMatch;
  })

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-bold mb-4">Books List</h2>
        <input
          type="text"
          placeholder="Filter by author"
          className="border p-2 mb-4"
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          className="border p-2 mb-4 ml-2"
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Checked out</option>
        </select>
        <ul className="space-y-4">
          {filteredBooks.map(book => (
            <li key={book.id} className="border p-4 rounded bg-white">
              <h3 className="text-xl">{book.title}</h3>
              <p>{book.author}</p>
              <p className={book.available ? "text-green-500" : "text-red-500"}>
                {book.available ? "Available" : "Checked Out"}
              </p>
              <a href={`/books/${book.id}`} className="text-blue-500 underline">
                View Details
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
