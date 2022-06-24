import React from 'react';
import {Categories} from '../components/Categories';
import {Sort} from '../components/Sort';
import {Skeleton} from '../components/PizzaBlock/Skeleton';
import {itemsType, PizzaBlock} from '../components/PizzaBlock/PizzaBlock';
import {Pagination} from '../components/Pagination/Pagination';
import {SearchContext} from '../App';
import {useDispatch, useSelector} from 'react-redux';
import {FilterState, setCategoryId} from '../redux/slices/filterSlice';
import {RootState} from '../redux/store';

export const Home = () => {
    const dispatch = useDispatch()
    const {categoryId, sort} = useSelector<RootState, FilterState>((state) => state.filter)

    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState<itemsType[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [currentPage, setCurrentPage] = React.useState(1)

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }
    React.useEffect(() => {
        setIsLoading(true)

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        fetch(`https://62aa3fdb3b3143855444bb5b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items.map((obj) => <PizzaBlock
        key={obj.id} {...obj}/>)

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage((number))}/>
        </div>
    );
};

