import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

export const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>()
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
        return <>Загрузка ...</>
    }

    return (
        <div className={'container'}>
            <img src={pizza.imageUrl} alt={'pizza img'}/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    );
};