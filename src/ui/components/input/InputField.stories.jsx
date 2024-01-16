import InputField from './InputField';
import { INPUT_TYPE } from '../../../ts/enums/input-type.enum';

const inputForm = {
    errors: null,
    validationSchema: null,
    register: () => ''  
};

const inputAttribute = {
    name: 'text',
    placeholder: '',
    label: 'Text demo',
    type: INPUT_TYPE.TEXT
};

export default {
    tags: ['autoclose'],
    title: 'InputField',
    component: InputField
}

export const InputFieldInitial = {
    args: {
        inputForm,
        inputAttribute,
        expandRowDesktop: false,
    }
}