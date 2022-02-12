import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './app.css';
import { IState } from './IstateInterface';

const App = () => {
  const [countries, setCountries] = useState<IState[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [showerror, setShowError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(countries);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (query !== '') {
        axios
          .get<IState[]>(`https://restcountries.com/v3.1/name/${query}`)
          .then(function (response) {
            setLoading(false);
            setCountries(response.data);
          })
          .catch(function (error) {
            // handle error
            if (error) {
              setLoading(false);
              setShowError('No Country Found');
            }
          });
      } else if (query === '') {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setLoading(true);
  };

  return (
    <div className='container'>
      <h3 className='heading'>Country List</h3>
      <div className='inputcontainer'>
        <input
          ref={inputRef}
          type='text'
          placeholder='Search Country'
          value={query}
          onChange={onChange}
        />
        <div className='icon-container'>
          {loading ? <i className='loader'></i> : ''}
        </div>
      </div>
      <ul className='list-country' id='style-1'>
        {countries &&
          countries.map((name, index) => (
            <li key={index} className='list-country-item'>
              {name.name.common}
            </li>
          ))}
        {showerror ? <li className='list-country-item'>{showerror}</li> : ''}
      </ul>
    </div>
  );
};

export default App;
