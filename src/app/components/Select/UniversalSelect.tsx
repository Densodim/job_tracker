import React, {FC} from 'react';
import { Select } from '@mantine/core';

const UniversalSelect: FC<Props> = ({label, placeholder = 'Select an option', value, onChange, options}) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-gray-700 font-medium mb-1">{label}</label>}
            <Select
                data={options}
                value={value}
                onChange={(newValue) => onChange(newValue || '')}
                placeholder={placeholder}
                classNames={{
                    input: 'w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500',
                }}
                nothingFoundMessage="No options available"
                searchable
                clearable
            />
        </div>
    );
};

export default UniversalSelect;

//type
type Props = {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
};