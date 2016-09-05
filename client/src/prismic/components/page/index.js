import React, {Component, PropTypes, createElement} from 'react'
import {compose, lifecycle, branch, renderComponent, setPropTypes, setDisplayName, withProps} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {loadForBookmark} from 'actions/prismic'
import {Loading} from 'components/page'
import factory from 'prismic/types/factory'
import {getDocumentForBookmark} from 'reducers/prismic'
import {classify} from 'utils/string'

const mapStateToProps = createSelector(
    (state, {bookmark}) => getDocumentForBookmark(state, bookmark),
    (state, {message, title}) => ({message, title}),
    (document, props) => {
        if (document) {
            return {
                ...props,
                isLoading: false,
                props: {...factory.getType(document)},
                component: require(`./${classify(document.type)}`).default
            }
        }

        return {
            ...props,
            isLoading: true
        }
    }
)

function Page({component, props}) {
    return createElement(component, props)
}

const Prismic = compose(
    setDisplayName('Page'),
    setPropTypes({
        bookmark: PropTypes.string.isRequired,
        title: PropTypes.string,
        message: PropTypes.string,
    }),
    connect(mapStateToProps, {
        loadForBookmark
    }),
    lifecycle({
        componentDidMount() {
            const {loadForBookmark, bookmark} = this.props

            loadForBookmark(bookmark)
        }
    }),
    branch(
        props => props.isLoading,
        renderComponent(Loading),
        // TODO: Remove with recompose newest release. Thrid argument default to identity
        Component => Component,
    ),
)(Page)

export default Prismic

export function withPrismic(props) {
    return withProps(props)(Prismic)
}