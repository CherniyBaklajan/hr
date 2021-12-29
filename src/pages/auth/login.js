import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import CustomForm from "../../components/form";
import {validator} from "../../components/validator";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [loading, setLoading] = useState(true);


    function submitHandler(values) {
        console.log(values);
    }

    return (
        <div className='login-page'>
            <Container fluid>
                <Row>
                    <Col md={6} className='p-0'>
                        <div className="left-img"></div>
                    </Col>
                    <Col md={6} className='text-center'>
                        <div className="login-form">
                            <div className="inner">
                                <div className="logo">LOGOTYPE</div>
                                <div className="title">Вход</div>
                                {CustomForm([
                                    {'name': 'login', 'label': 'Логин', 'type': 'text', 'validator': [validator.required()]},
                                    {'name': 'password', 'label': 'Пароль', 'type': 'password', 'validator': [validator.required()]},
                                    {'name': 'rememberMe', 'label': 'Запомнить меня', 'type': 'checkbox'},
                                ], submitHandler, 'Войти', true, 2)}
                                <Link
                                    className='forgot-btn'
                                    to={'/forgot'}
                                >
                                    Забыл пароль
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LoginPage;