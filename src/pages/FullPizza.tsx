import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {itemsType} from '../components/PizzaBlock/PizzaBlock';

export const FullPizza = () => {
    const [pizza, setPizza] = React.useState<itemsType>()
    const {id} = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://62aa3fdb3b3143855444bb5b.mockapi.io/items/${id}`)
                setPizza(data)
            } catch (error) {
                alert('Ошибка при получении пиццы')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return <div>Загрузка ...</div>
    }

    return (
        <div className={'container'}>
            <img src={pizza.imageUrl} alt={'pizza img'}/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    );
};