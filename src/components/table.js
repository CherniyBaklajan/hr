import {Col, Row} from "react-bootstrap";
import React from "react";

const CustomTable = (columns, data) => {
    return (
        <div className='table-box'>
            <div className="table-head">
                <Row>
                    <Col xs={1}>
                        <input type="checkbox"/>
                    </Col>
                    {columns.map(column => <Col xs={3}>
                        <div className="head-title">
                            {column.title}
                        </div>
                    </Col>)}
                </Row>
            </div>
            <div className="table-content">
                {data.map(item => <Row>
                    <Col xs={1}>
                        <input type="checkbox"/>
                    </Col>
                    {columns.map(column => <Col xs={3}>
                        {item[column.name]}
                    </Col>)}
                </Row>)}
            </div>
        </div>
    )
}

export default CustomTable;