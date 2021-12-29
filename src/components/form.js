import React, {useState} from "react";

const CustomForm = (fields, onSubmit, submitText = 'Отправить', steps = false, requiredFields = 0) => {
    const [values, setValues] = useState({});
    const [errors, setError] = useState({});
    let prevField = false;

    function onSetValue(e) {
        let val = {...values};
        if(e.target.value) val[e.target.name] = e.target.value;
        else delete val[e.target.name];
        setValues(val);
    }

    function formSubmit(e) {
        e.preventDefault();
        if(validateFields()) onSubmit(values);
    }

    function validateFields(){
        let errorsValid = {};
        for(let i = 0; i < fields.length; i++){
            if(fields[i].validator){
                for(let v = 0; v < fields[i].validator.length; v++){
                    let res = fields[i].validator[v].handler(values[fields[i].name]);
                    if(res.error === 1){
                        errorsValid[fields[i].name] = res.message;
                        break;
                    }else{
                        errorsValid[fields[i].name] = '';
                    }
                }
            }
        }

        if(Object.keys(errorsValid).length !== 0){
            setError(errorsValid);
            return false;
        }

        return true;
    }

    function renderItem(field, disable) {
        switch (field.type) {
            case 'text':
                return <input type="text" name={field.name} id={field.name} placeholder={field.placeholder ?? ''} onChange={onSetValue} disabled={disable}/>
            case 'email':
                return <input type="email" name={field.name} id={field.name} placeholder={field.placeholder ?? ''} onChange={onSetValue} disabled={disable}/>
            case 'password':
                return <input type="password" name={field.name} id={field.name} placeholder={field.placeholder ?? ''} onChange={onSetValue} disabled={disable}/>
            case 'checkbox':
                return <div className='checkbox-box'>
                    <input type="checkbox" name={field.name} id={field.name} onChange={onSetValue} disabled={disable}/>
                    <label htmlFor={field.name}>{field.label}</label>
                </div>
            case 'select':
                return <select name={field.name} onChange={onSetValue} id={field.name} placeholder={field.placeholder ?? ''} disabled={disable}>
                    {field.options.map(item => <option value={item.value}>{item.label}</option>)}
                </select>
        }
    }

    return (
        <form onSubmit={formSubmit} className='custom-form'>
            {fields.map(item => {
                let disable = false;
                if(steps && prevField && !values[prevField.name]) {
                    disable = true;
                    prevField = item;
                }
                if((steps && !prevField) || (prevField && values[prevField.name])){
                    prevField = item;
                }

                return <div className={`form-item ${errors[item.name] ? 'error' : ''}`}>
                    {item.type !== 'checkbox' ? <span><label htmlFor={item.name}>{item.label}</label><br/></span> : ''}
                    {renderItem(item, disable)}
                    <p className='error-text'>{errors[item.name]}</p>
                </div>
            })}
            <button type='submit' className={`submit-btn ${Object.keys(values).length !== requiredFields ? 'disabled' : ''}`} disabled={Object.keys(values).length !== fields.length}>{submitText}</button>
        </form>
    )
}


export default CustomForm;