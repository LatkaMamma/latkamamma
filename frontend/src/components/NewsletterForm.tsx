import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';
import { notifications } from '@/src/redux/features/notifications';
import { IconExclamationCircle, IconMail, IconSend } from '@tabler/icons-react';
import * as Yup from 'yup';
import { useAppDispatch } from '@/src/redux/hooks';

export interface NewsletterFormProps {
    afterSubmit?: () => void;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ afterSubmit }) => {
    const dispatch = useAppDispatch();
    const NewsletterSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        consented: Yup.boolean().oneOf([true], 'Required').required('Required'),
    });
    return (
        <Formik
            initialValues={{
                email: '',
                consented: false,
            }}
            validationSchema={NewsletterSchema}
            onSubmit={async (values) => {
                const response = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                if (response.ok) {
                    dispatch(notifications.success({ message: 'Thank you for subscribing!' }));;
                } else {
                    dispatch(notifications.error({ message: 'There was an error subscribing you to the newsletter. Please try again later.' }));
                }
                if (afterSubmit) {
                    afterSubmit();
                }
            }}
        >
            {({ values, errors, touched, isSubmitting, isValidating }) => (
                <Form className='box'>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className='control has-icons-left has-icons-right'>
                            <Field
                                name='email'
                                type='email'
                                className={`input ${errors.email && touched.email
                                    ? 'is-danger'
                                    : ''
                                    }`}
                                placeholder='Email'
                            />
                            <span className="icon is-small is-left">
                                <IconMail />
                            </span>
                            {
                                errors.email && touched.email ? (
                                    <span className="icon is-small is-right">
                                        <IconExclamationCircle />
                                    </span>
                                ) : null
                            }
                        </div>
                        {
                            errors.email && touched.email ? (
                                <p className="help is-danger">{errors.email}</p>
                            ) : null
                        }
                    </div>
                    <div className='field'>
                        <label className='checkbox'>
                            <Field
                                name='consented'
                                type='checkbox'
                                className='checkbox'
                            />
                            I have read and agree to the{' '} <a href='/privacy-policy'>Privacy Policy</a> and <a href='/terms-and-conditions'>Terms and Conditions</a>
                        </label>
                        {
                            errors.consented && touched.consented ? (
                                <p className="help is-danger">{errors.consented}</p>
                            ) : null
                        }
                    </div>
                    <div className='field'>
                        <button
                            type='submit'
                            className={`button is-primary ${isSubmitting || isValidating ? 'is-loading' : ''}`}
                            disabled={!!(errors.email || errors.consented || isSubmitting || isValidating)}
                        >
                            Subscribe
                            <span className="icon is-small">
                                <IconSend />
                            </span>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>

    )
}
