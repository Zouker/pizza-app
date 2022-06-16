import React from 'react'
import ContentLoader from 'react-content-loader'

export const Skeleton = () => (
    <ContentLoader
        className={'pizza-block'}
        speed={2}
        width={280}
        height={493}
        viewBox="0 0 280 493"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="143" cy="130" r="130"/>
        <rect x="0" y="277" rx="10" ry="10" width="280" height="27"/>
        <rect x="0" y="323" rx="10" ry="10" width="280" height="88"/>
        <rect x="0" y="437" rx="10" ry="10" width="95" height="30"/>
        <rect x="125" y="426" rx="25" ry="25" width="152" height="45"/>
    </ContentLoader>
)

