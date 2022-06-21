import React from 'react'

type CategoriesPropsType = {
    value: number
    onChangeCategory: (index: number) => void
}

export const Categories: React.FC<CategoriesPropsType> = ({value, onChangeCategory}) => {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) =>
                    <li key={value + index} onClick={() => onChangeCategory(index)}
                        className={value === index ? 'active' : ''}>{categoryName}</li>
                )}
            </ul>
        </div>
    )
}