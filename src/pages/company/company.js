import Layout from "../../components/layout";
import {Col, Row} from "react-bootstrap";
import React, {useState} from "react";
import FilterBox from "../../components/filter-box";
import CustomForm from "../../components/form";
import CustomTable from "../../components/table";

const Company = () => {
    const [filters, setFilters] = useState([]);

    function setFiltersValue(filter){
        let newFilters = filters.filter(e => e.name !== filter.name);
        setFilters([...newFilters, filter]);
        console.log([...newFilters, filter]);
    }

    return (
        <Layout>
            <div className="upper-line">
                <Row>
                    <Col sm='6'>
                        <div className="title">Комании</div>
                    </Col>
                    <Col sm='6' className='text-right'>
                       <div className="button-box">
                           <a href="#" className='btn btn-dark'><i className='fas fa-plus-circle'></i> Добавить</a>
                           <a href="#" className='icon-btn'><i className='fas fa-info-circle'></i></a>
                           <a href="#" className='icon-btn'><i className='fas fa-cog'></i></a>
                       </div>
                    </Col>
                </Row>
            </div>
            <div className="base-content">
                <Row>
                    <Col sm={3}>
                        <div className="filter-box">
                            <input type="text" className='search-input' placeholder='Найти'/>
                            <div className="filter-title">
                                Настройки фильтра <i className="fas fa-filter"></i>
                            </div>
                            {FilterBox('Рубрики', 'category', 'list', setFiltersValue, [
                                {name: 'Авто-мото', value: 1, count: 10, sub: [
                                        {name: 'sub 1', value: 3, count: 1},
                                        {name: 'sub 2', value: 4, count: 1}
                                    ]},
                                {name: 'Бытовая техника', value: 2, count: 1},
                            ])}
                            {FilterBox('По регионам', 'region', 'list', setFiltersValue, [
                                {name: 'Узбекистан', value: 'uz', count: 130},
                                {name: 'Казахстан', value: 'kz', count: 10},
                                {name: 'Грузия', value: 'gz', count: 27},
                                {name: 'Россия', value: 'ru', count: 50},
                                {name: 'Германия', value: 'gr', count: 32},
                            ])}
                            {FilterBox('Время работы','work_time', 'time', setFiltersValue)}
                            {FilterBox('Тип', 'type', 'checkbox', setFiltersValue, [
                                {name: 'Государственные', value: 1, count: 20},
                                {name: 'Частные', value: 2, count: 10},
                            ])}
                        </div>
                    </Col>
                    <Col sm={9}>
                        {CustomTable([
                            {title: 'Название', name: 'name'},
                            {title: 'Регион', name: 'zone'},
                            {title: 'Рубрика', name: 'category'},
                        ],
                        [
                            {name: 'Global Solutions', zone: 'Узбекистан', category: 'Информационные технологии'}
                        ])}
                    </Col>
                </Row>
            </div>
        </Layout>
    );
}

export default Company;