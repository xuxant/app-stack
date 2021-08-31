import React, { useState } from 'react'
import User from './card-list/card-list.components'
import './Books.style.css'

const LibraryBooks = ({placeholder, API_NAME, API_ENDPOINT}) => {

    const [data, setData] = useState([]);
  
    // const [message, setMessage ] = useState('')

    const handleClick = () => {
        fetch(API_ENDPOINT)
            .then(response => response.json())
            .then(data => setData(data.message))

        console.log(data)
      }

    return (
        <div className="books-div">
            <button 
                className="button"
                onClick={handleClick}
            >
                {placeholder}
            </button>
            <p className="Texts">
                <h2>{placeholder} current books collection.</h2>
                Book Id: {data.id} <br />
                Book Name: {data.name} <br/>
                Book Price: {data.price} <br />
                Author: {data.author} <br />
                
            </p>
        </div>
            
    )
}

LibraryBooks.defaultProps = {
    placeholder: "GetUser",
    API_NAME: "Books"
}

export default LibraryBooks