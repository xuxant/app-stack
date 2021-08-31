import React, { useState } from 'react'
import './library.style.css'
import Books from '../Books'

const LibraryInfo = ({placeholder, API_ENDPOINT}) => {

    const [data, setData] = useState([]);
  
    // const [message, setMessage ] = useState('')

    const handleClick = () => {
        fetch(API_ENDPOINT)
            .then(response => response.json())
            .then(data => setData(data.message))
        console.log(data)
    }
    
    return (
        <div className="library-info">
            <button 
                className="button"
                onClick={handleClick}
            >
                {placeholder}
            </button>
            <div>
                {
                    data.map(library => (
                        <Books key={library.id} placeholder={library.name} API_ENDPOINT={API_ENDPOINT + '/' + library.id + '/books'} />
                    ))
                }
            </div>
        </div>
    )
}

LibraryInfo.defaultProps = {
    data: [],
    placeholder: "Get Book From Library"
}

export default LibraryInfo