import React from 'react'

const SearchInput = ({image, placeholdertext , classnames, imageclass}) => {
    return (
        <>
            <img
                src={image}
                className={imageclass}
            />
            <input
                type="text"
                placeholder={placeholdertext}
                className={classnames}
            />
        </>
    )
}

export default SearchInput
