import React, {useEffect, useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import IonRangeSlider from 'react-ion-slider'

const FilterBox = (title, name, type, changeHandler, records = false) => {
    const [isHidden, setHidden] = useState(false);
    const [selectedItem, setSelected] = useState('');
    const [time, setTime] = useState([9, 18]);
    const [checkboxes, setCheckbox] = useState([]);
    const [day, setDay] = useState([1, 2, 3, 4, 5]);

    const days = [
        {name: 'Пн', value: 1},
        {name: 'Вт', value: 2},
        {name: 'Ср', value: 3},
        {name: 'Чт', value: 4},
        {name: 'Пт', value: 5},
        {name: 'Сб', value: 6},
        {name: 'Вс', value: 7},
    ];

    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);

        useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    }


    useDidMountEffect(() => {
       onChangeFilter({time: printTime(), days: day});
    }, [time, day]);

    function toggleFilterBox(e) {
        e.preventDefault();
        setHidden(!isHidden);
    }

    function onChangeFilter(item, e = false) {
        if(e) e.preventDefault();
        if(item.sub){
            setSelected(item.value);
        }else{
            changeHandler({name: name, value: item.value ?? item})
        }
    }

    function checkboxList(e){
        let newCheckboxesList = [...checkboxes];

        if(!e.target.checked) newCheckboxesList = newCheckboxesList.filter(i => i !== e.target.value);
        else newCheckboxesList.push(e.target.value);
        setCheckbox(newCheckboxesList);
        onChangeFilter(newCheckboxesList);
    }

    function closeSelected(e) {
        e.preventDefault();
        setSelected('');
    }

    function checkboxDay(e, value) {
        e.preventDefault();
        let newDay = day;
        if(newDay.includes(value)) {
            newDay = newDay.filter(e => e !== value);
        }else{
            newDay.push(value);
            newDay = newDay.sort((a, b) => a - b);
        }

        setDay([...newDay]);
    }

    function printDays(){
        let dayString = '';
        let prevItem;
        for(let i = 0; i < day.length; i++){
            let item = days.find(d => d.value === day[i]);
            if(i === 0){
                dayString = item.name;
            }else {
                if ((day[i] - prevItem.value) === 1) {
                    if((day[i+1] - item.value) === 1) {
                        if (dayString.slice(-1) !== '-') dayString += '-';
                    }else{
                        if (dayString.slice(-1) !== '-') dayString += '-';
                        dayString += item.name;
                    }
                }else {
                    dayString += ', ' + item.name;
                }
            }
            prevItem = item;
        }

        return dayString.replaceAll('-', ' - ');
    }

    function printTime(){
        return `${time[0].toString().length > 1 ? `${time[0]}:00` : `0${time[0]}:00`} -
                                ${time[1].toString().length > 1 ? `${time[1]}:00` : `0${time[1]}:00`}`;
    }

    function printFilter() {
        switch (type) {
            case 'time':
                return <div className='filter-time-box'>
                    <Row>
                        <Col xs={5}>
                            <div className="time-text">
                                {printTime()}
                            </div>
                        </Col>
                        <Col xs={7}>
                            <div className="time-text text-right">
                                {printDays()}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <IonRangeSlider
                                type='double'
                                skin='round'
                                grid={true}
                                hide_from_to={true}
                                hide_min_max={true}
                                min={0}
                                max={24}
                                from={time[0]}
                                to={time[1]}
                                step={1}
                                prettify={(value) => {
                                    return value.toString().length > 1 ? `${value}:00` : `0${value}:00`
                                }}
                                onFinish={(value) => {
                                    setTime([value.from, value.to]);
                                }}
                                keyboard={false} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="checkbox-list">
                                {days.map(item => <div className="checkbox-item">
                                        <a href="#" onClick={(e) => checkboxDay(e, item.value)} className={day.includes(item.value) ? 'active' : ''}>
                                            {item.name}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            case 'list':
                return records.map(record => {
                    if(record.value === selectedItem) return <div>
                        <a href="#" onClick={closeSelected}>
                            <div className='list-filter-box-item parent-title'>
                                <div className="name"><i className='fas fa-chevron-left'></i> {record.name}</div>
                                <div className="count">{record.count}</div>
                            </div>
                        </a>
                        <div className="sub-list">
                            {record.sub.map(subItem => <div className='list-filter-box-item'>
                                <div className="name">
                                    <input type="checkbox" onChange={checkboxList} name={name} value={subItem.value} id={`checkbox-${subItem.value}`}/>
                                    <label htmlFor={`checkbox-${subItem.value}`}>{subItem.name}</label>
                                </div>
                                <div className="count">{subItem.count}</div>
                            </div>)}
                        </div>
                    </div>
                    else return <a href="#" onClick={(e) => onChangeFilter(record, e)}>
                        <div className='list-filter-box-item'>
                            <div className="name">{record.name}</div>
                            <div className="count">{record.count}</div>
                        </div>
                    </a>
                })
            case 'checkbox':
                return records.map(record => <div className='list-filter-box-item'>
                    <div className="name">
                        <input type="checkbox" onChange={checkboxList} name={name} value={record.value} id={`checkbox-${record.value}`}/>
                        <label htmlFor={`checkbox-${record.value}`}>{record.name}</label>
                    </div>
                    <div className="count">{record.count}</div>
                </div>)

        }
    }

    return (
        <div className='filter-boxs'>
            <div className="title-filter-box">
                <a href="#" onClick={toggleFilterBox}>
                    <div>{title} {!isHidden ? <i className="fas fa-chevron-up"></i> :<i className="fas fa-chevron-down"></i>}</div>
                </a>
            </div>
            <div className="list-filter-box" style={{height: isHidden ? '0' : 'auto'}}>
                {printFilter()}
            </div>
        </div>
    )
}

export default FilterBox;