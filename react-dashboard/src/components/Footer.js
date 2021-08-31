import PropTypes from 'prop-types'
import './Footer.style.css'

const Footer = ({ title }) => {
    return (
        <footer>
            <h1 className="site-footer">{title}</h1>
        </footer>
    )
}

Footer.defaultProps = {
    title: "Musewerx Demo Application",
}

Footer.propTypes = {
    title: PropTypes.string.isRequired
}

export default Footer