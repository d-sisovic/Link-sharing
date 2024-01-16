import Input from './Input';
import { INPUT_TYPE } from '../../../ts/enums/input-type.enum';

export default {
    title: 'Input',
    component: Input,
    tags: ['autocomplete']
}

export const InputState = {
    args: {
        inputAttribute: {
            name: 'text',
            placeholder: '',
            label: 'Text demo',
            type: INPUT_TYPE.TEXT
        },
        inputForm: {
            errors: null,
            validationSchema: null,
            register: () => ''
        }
    }
};