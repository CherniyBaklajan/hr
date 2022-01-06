import {useState} from "react";

const FilterBox = (title, records) => {
    const [isHidden, setHidden] = useState(false);

    function toggleFilterBox(e) {
        e.preventDefault();
        setHidden(!isHidden);
    }

    return (
        <div className='filter-boxs'>
            <div className="title-filter-box">
                <a href="#" onClick={toggleFilterBox}>
                    <div>{title} {!isHidden ? <i className="fas fa-chevron-up"></i> :<i className="fas fa-chevron-down"></i>}</div>
                </a>
            </div>
            <div className="list-filter-box" style={{height: isHidden ? '0' : 'auto'}}>
                {records.map(record => <div className='list-filter-box-item'>
                    <div className="name">{record.name}</div>
                    <div className="count">{record.count}</div>
                </div>)}
            </div>
        </div>
    )
}

export default FilterBox;