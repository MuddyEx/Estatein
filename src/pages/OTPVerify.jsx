
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { verifyOTP } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  otp: Yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
  role: Yup.string().oneOf(['user', 'agent', 'admin']).required('Role is required'),
});

function OTPVerify() {
  const navigate = useNavigate();
  const { email, role } = useSelector((state) => state.auth); // Pre-fill from Redux

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
        <Formik
          initialValues={{ email: email || '', otp: '', role: role || '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const response = await verifyOTP(values);
              console.log('OTP verification successful:', response.data);
              alert(response.data.message);
              navigate(values.role === 'user' ? '/user/login' : values.role === 'agent' ? '/agent/login' : '/admin/login');
            } catch (error) {
              console.error('OTP verification error:', error.response?.data);
              setErrors({ submit: error.response?.data.message || 'Verification failed' });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                <Field
                  name="otp"
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="otp" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <Field
                  as="select"
                  name="role"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <ErrorMessage name="submit" component="div" className="text-red-500 text-sm" />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Verifying...' : 'Verify OTP'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default OTPVerify;