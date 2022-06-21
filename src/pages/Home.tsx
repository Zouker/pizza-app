import React from 'react';
import {Categories} from '../components/Categories';
import {Sort} from '../components/Sort';
import {Skeleton} from '../components/PizzaBlock/Skeleton';
import {itemsType, PizzaBlock} from '../components/PizzaBlock/PizzaBlock';

export const Home = () => {
    const [items, setItems] = React.useState<itemsType[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [categoryId, setCategoryId] = React.useState(0)
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating'
    })

    React.useEffect(() => {
        setIsLoading(true)

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        fetch(`https://62aa3fdb3b3143855444bb5b.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)}/>
                <Sort value={sortType} onChangeSort={(index) => setSortType(index)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : items.map((obj) => <PizzaBlock
                        key={obj.id} {...obj}/>)}
            </div>
        </div>
    );
};

