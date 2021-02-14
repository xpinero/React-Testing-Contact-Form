import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import ContactForm from './ContactForm';
import { act } from 'react-dom/test-utils';

test('Contact form adds new contact to list', async () => {
  const screen = render(<ContactForm />);
  
  const firstNameInput = screen.getByPlaceholderText('Edd');
  const lastNameInput = screen.getByPlaceholderText('Burke');
  const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');

  const submitButton = screen.getByRole('button');
  await act(async() => {
   fireEvent.change(firstNameInput, {target: {value: "Edd"}});
   fireEvent.change(lastNameInput, {target: {value: 'Burke'}});
   fireEvent.change(email, {target: {value: 'bluebill1049@hotmail.com'}});
   fireEvent.click(submitButton);
  }) 
  
  const messageSuccess = screen.getByTestId('Message');
  
  expect(messageSuccess.textContent).toContain(`{
  "firstName": "Edd",
  "lastName": "Burke",
  "email": "bluebill1049@hotmail.com",
  "message": ""
}`);
})