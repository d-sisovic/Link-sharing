import InputField from './InputField';
import { render, screen, } from '@testing-library/react';
import { INPUT_TYPE } from '../../../ts/enums/input-type.enum';

const inputAttribute = {
    name: 'text',
    placeholder: '',
    label: 'Text demo',
    type: INPUT_TYPE.TEXT
};

const inputForm = {
    errors: { message: 'Error message' },
    validationSchema: null,
    register: () => ''
} as never;

describe('InputField component', () => {
    it('should render initial component', () => {
        render(<InputField expandRowDesktop={false} inputAttribute={inputAttribute} inputForm={inputForm}>
            <p>Test child</p>
        </InputField>);

        const labelElement = screen.getByTestId('test-input')

        expect(labelElement).toBeVisible();
    });
});