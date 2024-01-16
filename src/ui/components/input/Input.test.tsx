import Input from './Input';
import { screen, render } from '@testing-library/react';
import { INPUT_TYPE } from '../../../ts/enums/input-type.enum';

const inputAttribute = {
    name: 'text',
    placeholder: '',
    label: 'Text demo',
    type: INPUT_TYPE.TEXT
};

const inputForm = {
    errors: null,
    validationSchema: null,
    register: () => ''
} as never;

describe('Input component', () => {
    it('should render initial component', () => {
        render(<Input inputForm={inputForm} inputAttribute={inputAttribute}></Input>);

        const labelElement = screen.getByText(inputAttribute.label);

        expect(labelElement).toBeVisible();
    });
});