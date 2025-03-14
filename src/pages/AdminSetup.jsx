
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createAdmin } from '../services/api.js';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  secretKey: Yup.string().required('Secret key is required'),
});

function AdminSetup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Admin Account</h2>
        <Formik
          initialValues={{ email: '', password: '', secretKey: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            console.log('Form submitted with values:', values); // Debug log
            try {
              const response = await createAdmin(values);
              console.log('Admin creation successful:', response.data);
              alert(response.data.message);
              navigate('/admin/login');
            } catch (error) {
              console.error('Admin creation error:', error.response?.data || error.message);
              setErrors({ submit: error.response?.data.message || 'Failed to create admin' });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700">
                  Secret Key
                </label>
                <Field
                  name="secretKey"
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="secretKey" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <ErrorMessage name="submit" component="div" className="text-red-500 text-sm" />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Creating...' : 'Create Admin'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminSetup;