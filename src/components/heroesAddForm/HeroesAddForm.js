// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addHero } from '../../actions';
import { useHttp } from '../../hooks/http.hook';

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

    const { filters, filtersLoadingStatus } = useSelector(state => state.filters);
    const { heroes } = useSelector(state => state.heroes);
    const { request } = useHttp();

    const dispatch = useDispatch();

    const createHero = (e) => {
        e.preventDefault();
        if (name.length && description.length && element) {
            const hero = {
                id: uuidv4(),
                name,
                description,
                element
            }

            request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(hero))
                .then(
                    dispatch(addHero([
                        ...heroes,
                        hero
                    ])),
                )
                .catch((err) => console.log(err))

            setName('');
            setDescription('');
            setElement('');
        }
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        // Если фильтры есть, то рендерим их
        if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {
                // Один из фильтров нам тут не нужен
                // eslint-disable-next-line
                if (name === 'all') return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={name}
                    placeholder="Как меня зовут?"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    value={description}
                    placeholder="Что я умею?"
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ "height": '130px' }}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-selectx"
                    id="element"
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                >
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button onClick={createHero} type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;