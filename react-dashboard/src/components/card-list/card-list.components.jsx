import Card from '../card/Card.component'
import './card-list.style.css'

const CardList = props => {
    return (
        <div className="card-list">
            {props.data.map(user => (
                <Card key={user.id + Math.floor((Math.random() * 100) + 1)} random_number={Math.floor((Math.random() * 100) + 1)} reference={user} />
            ))}
        </div>
    )
}

CardList.defaultProps = {
    data: []
}

export default CardList
