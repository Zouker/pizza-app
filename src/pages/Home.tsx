import React from 'react';
import {Categories} from '../components/Categories';
import {Sort} from '../components/Sort';
import {Skeleton} from '../components/PizzaBlock/Skeleton';
import {itemsType, PizzaBlock} from '../components/PizzaBlock/PizzaBlock';

export const Home = () => {
    const [items, setItems] = React.useState<itemsType[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        fetch('https://62aa3fdb3b3143855444bb5b.mockapi.io/items')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false)
            })
    }, [])

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : items.map((obj) => <PizzaBlock
                        key={obj.id} {...obj}/>)}
            </div>

        </>
    );
};

