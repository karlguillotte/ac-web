import React, {PropTypes, createElement} from 'react'
import CSSModules from 'react-css-modules'
import Headline from './Headline'
import styles from './Page.css'

Section.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    title: PropTypes.string.isRequired,
    hash: PropTypes.string,
    headline: PropTypes.string,
    level: PropTypes.oneOf([1, 2, 3, 4, 5]),
}

// TODO: No header tag if there is no headline
// TODO: Finish implementing hash. Look at GitHub

function Section({ title, headline, children, hash, level = 1 }) {
    const header = `h${level + 1}`

    return (
        <section styleName='Section'>
            <header>
                {createElement(header, null, title)}
                {headline && <Headline>{headline}</Headline>}
            </header>
            {children}
        </section>
    )
}

export default CSSModules(Section, styles)