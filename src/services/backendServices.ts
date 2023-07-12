/* eslint-disable import/prefer-default-export */
import { RegistrationFormInterface } from 'interfaces/form';
import { PostRequestPayload } from 'interfaces/service';
import { endpoint } from 'constant/services';
import httpClient from './httpClient';

export const postInvitationRegistration = async (values: RegistrationFormInterface) => {
    const { confirmEmail, fullName, rememberMe } = values;

    const payload: PostRequestPayload = {
        name: fullName,
        email: confirmEmail,
    };

    if (rememberMe) {
        localStorage.setItem('users', JSON.stringify(payload));
    }

    const data = await httpClient.post(endpoint as string, payload);
    return data;
};
