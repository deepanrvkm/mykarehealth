'use client';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useUser } from '@/context/UserContext';
import LoadingPage from '@/app/loading';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '@/components/AuthLayout';
import InputField from '@/components/InputField';
import SubmitButton from '@/components/SubmitButton';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  const router = useRouter();
  const { user, login, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      if (user.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setStatus }) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.find(u => {
        return u.username === values.username && u.password === values.password
      });
      if (userExists) {
        login(userExists);
        router.push('/dashboard');
      } else if (values.username === 'admin' && values.password === 'admin') {
        login({ username: 'admin', isAdmin: true });
        router.push('/admin');
      } else {
        setStatus('Invalid username or password');
      }
    },
  });

  if (loading) return <LoadingPage />;
  if (user) return null;

  return (
    <AuthLayout title="Sign In">
      <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-5">
        <InputField
          name="username"
          type="text"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.username}
          touched={formik.touched.username}
        />
        <InputField
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
        />
        {formik.status && (
          <div className="text-red-500 text-sm text-center">{formik.status}</div>
        )}
        <SubmitButton>Sign In</SubmitButton>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <Link href="/auth/register" className="text-[#00b4b9]">Register here</Link>
      </p>
    </AuthLayout>
  );
}