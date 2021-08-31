import PropTypes from 'prop-types'
import './Header.style.css'

const Header = ({ title }) => {
    return (
        <header>
            <h1 className="header">{title}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: "Musewerx",
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
