import React from 'react';
import Datetime from 'react-datetime';

const DATE_FORMAT = 'MM-DD-YYYY'

const FormikDateTime = ({ field, form, timeFormat }) => {
    const onFieldChange = value => {
        let dateValue = value;
        form.setFieldValue(field.name, dateValue);
    }

    const onFieldBlur = () => {
        form.setFieldTouched(field.name, true);
    }

    return (
        <Datetime
            dateFormat={DATE_FORMAT}
            timeFormat={timeFormat}
            id={field.name}
            name={field.name}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            value={field.value}
        />
    );
}

export default FormikDateTime;