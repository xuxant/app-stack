import './card.style.css'
const Card = props => {
    return (
        <div className="card-container">
            <img
                alt="monster"
                src={`https://robohash.org/${props.random_number}?set=set2&size=180x180`}
            ></img>
            <h1>{props.reference.name}</h1>
        </div>
    )
}

export default Card
