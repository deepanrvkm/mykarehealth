'use client';
import { useRouter } from "next/navigation";
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '@/components/AuthLayout';
import InputField from '@/components/InputField';
import SubmitButton from '@/components/SubmitButton';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Username must not include symbols')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(12, 'Password must not exceed 12 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,12}$/,
      'Password must contain at least 1 uppercase letter, 1 number, and 1 symbol'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function Register() {
  const router = useRouter();
  const { login } = useUser();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setStatus }) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => {
        return u.username === values.username || u.email === values.email
      })) {
        setStatus('Username or email already exists');
        return;
      }
      const newUser = { username: values.username, email: values.email, password: values.password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      login(newUser);
      router.push('/dashboard');
    },
  });

  return (
    <AuthLayout title="Register">
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
          name="email"
          type="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
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
        <InputField
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
        />
        {formik.status && (
          <div className="text-red-500 text-sm text-center">{formik.status}</div>
        )}
        <SubmitButton>Register</SubmitButton>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link href="/auth/signin" className="text-[#00b4b9]">Sign in here</Link>
      </p>
    </AuthLayout>
  );
}