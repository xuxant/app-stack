import React, { useState } from 'react'
import User from './card-list/card-list.components'
import './Data.style.css'

const Data = ({placeholder, API_NAME, API_ENDPOINT}) => {

    const [data, setData] = useState('');
  
    // const [message, setMessage ] = useState('')

    const handleClick = () => {
        fetch(API_ENDPOINT)
            .then(response => response.json())
            .then(data => setData(data))
      }

    // const booksArray = Object.keys(books).map((key) => [key, books[key]])
    // console.log(booksArray)
    return (
        <div className="button-div">
            <button 
                className="button"
                onClick={handleClick}
            >
                {placeholder}
            </button>
            <p className="Texts">
                This division will present the data rendered through {API_NAME} API.
            </p>
            <div>
                {/* {JSON.stringify(books.data)} */}
                <User data={data.message}></User>
            </div>
        </div>
            
    )
}

Data.defaultProps = {
    placeholder: "GetUser",
    API_NAME: "Books"
}

export default Data