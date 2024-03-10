// import React, {useState} from 'react';
// import './Payment.css';
// import Header from './Header';
// import { Link, useLocation } from 'react-router-dom'


// const ItemSearch = () => {

//         const [items, setItems] = useState([
//           { id: 1, name: 'Item 1', description: 'Description of item 1', keywords: ['keyword1', 'keyword2'] },
//           { id: 2, name: 'Item 2', description: 'Description of item 2', keywords: ['keyword2', 'keyword3'] },
//           // Add more items as needed
//         ]);
//         const [keyword, setKeyword] = useState('');
//         const [filteredItems, setFilteredItems] = useState([]);
      
//         const handleKeywordChange = (e) => {
//           setKeyword(e.target.value);
//         };
      
//         const handleSearch = () => {
//           const filtered = items.filter(item =>
//             item.keywords.some(kw => kw.toLowerCase().includes(keyword.toLowerCase()))
//           );
//           setFilteredItems(filtered);
//         };

//   return (
//     <div className="App">
//     < Header/>
//     <div>
//       <input type="text" value={keyword} onChange={handleKeywordChange} />
//       <button onClick={handleSearch}>Search</button>
//       <ul>
//         {filteredItems.map(item => (
//           <li key={item.id}>
//             <h3>{item.name}</h3>
//             <p>{item.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//     </div>
//   );
// }

// export default ItemSearch;

import React, { useState } from 'react';
import './itemSearch.css';
import Header from './Header';

interface Item {
  id: number;
  name: string;
  description: string;
  keywords: string[];
}

const ItemSearch = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Item 1', description: 'Description of item 1', keywords: ['keyword1', 'keyword2'] },
    { id: 2, name: 'Item 2', description: 'Description of item 2', keywords: ['keyword2', 'keyword3'] },
    // Add more items as needed
  ]);
  const [keyword, setKeyword] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    const filtered = items.filter(item =>
      item.keywords.some(kw => kw.toLowerCase().includes(keyword.toLowerCase()))
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="App">
      <Header />
      <div>
      <div className="container">
  <div className="form">
    <div className="input-container">
      <input type="text" value={keyword} onChange={handleKeywordChange} placeholder="Enter keyword" />
    </div>
    <button className="button" onClick={handleSearch}>Search</button>
  </div>
</div>


        <ul>
          {filteredItems.map(item => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemSearch;

// import React, { useState } from 'react';
// import axios from 'axios';

// const ItemSearch = () => {
//   const [keyword, setKeyword] = useState('');
//   const [filteredItems, setFilteredItems] = useState([]);

//   const handleKeywordChange = (e) => {
//     setKeyword(e.target.value);
//   };

//   const handleSearch = () => {
//     axios.get(`http://localhost:8080/product/${keyword}`)
//       .then(response => {
//         setFilteredItems(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   };

//   return (
//     <div className="container">
//       <div className="form">
//         <div className="input-container">
//           <input type="text" value={keyword} onChange={handleKeywordChange} placeholder="Enter keyword" />
//         </div>
//         <button className="button" onClick={handleSearch}>Search</button>
//       </div>
//       <ul>
//         {filteredItems.map(item => (
//           <li key={item.id}>
//             <h3>{item.name}</h3>
//             <p>{item.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ItemSearch;
