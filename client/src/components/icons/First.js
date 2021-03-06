import React, { PropTypes } from 'react'
import Icon from './Icon'
import { pure } from 'recompose'

function First({ inverse = false, ...props }) {
	return (
		<Icon {...props}>
			<path d='M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z' fill={inverse ? 'white' : 'black'}/>
		    <path d='M24 24H0V0h24v24z' fill='none'/>
		</Icon>
	)
}

export default pure(First)
