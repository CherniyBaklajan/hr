import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import CustomForm from "../../components/form";
import {validator} from "../../components/validator";
import { Link } from "react-router-dom";

const ForgotPage = () => {
    const [loading, setLoading] = useState(true);


    function submitHandler(values) {
        console.log(values);
    }

    return (
        <div className='forgot-page'>
            <Container fluid>
                <Row>
                    <Col md={6} className='p-0'>
                        <div className="left-img"></div>
                    </Col>
                    <Col md={6} className='text-center'>
                        <div className="login-form">
                            <div className="inner">
                                <div className="logo">LOGOTYPE</div>
                                <div className="title">Забыл пароль</div>
                                <div className="hint">На указанный email будет отправлено письмо
                                    с инструкцией о восстановлении</div>
                                {CustomForm([
                                    {'name': 'email', 'label': 'Почта', 'type': 'email', 'placeholder': 'sample@mail.ru', 'validator': [validator.required()]},
                                ], submitHandler, 'Восстановить пароль')}
                                <Link
                                    className='forgot-btn'
                                    to={'/login'}
                                >
                                    Я вспомнил
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ForgotPage;