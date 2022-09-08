import React from 'react';
import {Categories, Pagination, PizzaBlock, Skeleton, Sort} from '../components';
import {setCategoryId, setCurrentPage} from '../redux/filter/slice';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {useNavigate} from 'react-router-dom';
import {selectFilter} from '../redux/filter/selectors';
import {selectPizzaData} from '../redux/pizza/selectors';
import {fetchPizzas} from '../redux/pizza/asyncActions';

export const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isMounted = React.useRef(false)

    const {categoryId, sort, currentPage, searchValue} = useAppSelector(selectFilter)
    const {items, status} = useAppSelector(selectPizzaData)

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage: String(currentPage)
        }))

        window.scrollTo(0, 0)
    }

    // Если изменили параметры и был первый рендер
    /*React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true

        if (window.location.search) {
            dispatch(fetchPizzas({} as SearchPizzaParams))
        }
    }, [categoryId, sort.sortProperty, searchValue, currentPage])*/

    // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
    /*React.useEffect(() => {
        return () => {
            if (window.location.search) {
                const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
                const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
                dispatch(setFilters({
                    searchValue: params.search,
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sort: sort || sortList[0],
                }))
            }
            isSearch.current = true
        }
    }, [])*/

    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        // window.scrollTo(0, 0)
        // if (!isSearch.current) {
        getPizzas()
        // }
        // isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error'
                    ? <div className={'content__error-info'}>
                        <h2>Произошла ошибка 😕</h2>
                        <p>У сожалению, не удалось получить пиццы. Попробуйте повторить
                            попытку позже.</p>
                    </div>
                    : <div className="content__items">
                        {status === 'loading' ? skeletons : pizzas}
                    </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

