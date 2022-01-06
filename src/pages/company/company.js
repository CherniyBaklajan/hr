import Layout from "../../components/layout";
import {Col, Row} from "react-bootstrap";
import React from "react";
import FilterBox from "../../components/filter-box";

const Company = () => {
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
                            {FilterBox('Рубрики', [
                                {name: 'Авто-мото', count: 10},
                                {name: 'Бытовая техника', count: 1},
                            ])}
                        </div>
                    </Col>
                    <Col sm={9}></Col>
                </Row>
            </div>
        </Layout>
    );
}

export default Company;