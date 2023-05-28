import { FormControlLabel, Checkbox } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { InputFieldProps } from 'interfaces/form';
import React from 'react';

const CustomisedCheckbox = ({ fieldName, inputLabel, fieldStyle = {} }: InputFieldProps) => {
    const [field] = useField(fieldName);
    const { setFieldValue } = useFormikContext();
    return (
        <FormControlLabel
            sx={fieldStyle}
            control={
                <Checkbox
                    checked={field.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(fieldName, e.target.checked);
                    }}
                />
            }
            label={inputLabel}
        />
    );
};

export default CustomisedCheckbox;
