import './App.css';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import bg from "./images/bg.jpg";


const validationSchema = Yup.object({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string().email('Email format should be "Jack@gmail.com"').required('Email is required'),
  password: Yup.string()
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      'Password must start with r__M_9')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

function App() {
  return (
    <div className="container">
      <div className="form-container">
        <h1>Welcome!</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, values, errors }) => {
            return (
              <Form className="form-content">
                <div className="form-field">
                  <Field type="text" name="name" placeholder="Name" className={`input-field ${errors.name ? 'input-error' : ''}`} />
                  <label className="floating-label">NAME</label>
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                <div className="form-field">
                  <Field type="email" name="email" placeholder="Email" className={`input-field ${errors.email ? 'input-error' : ''}`} />
                  <label className="floating-label">EMAIL</label>
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="form-field">
                  <Field type="password" name="password" placeholder="Password" className={`input-field ${errors.password ? 'input-error' : ''}`} />
                  <label className="floating-label">PASSWORD</label>
                  {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <div className="form-field">
                  <Field type="password" name="confirmPassword" placeholder="Confirm Password" className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`} />
                  <label className="floating-label">CONFIRM PASSWORD</label>
                  {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || !isValid} 
                  className={`submit-btn ${isValid && values.name && values.email && values.password && values.confirmPassword ? 'enabled' : ''}`}
                >
                  SIGN UP
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="image-container">
        <img src={bg} alt="Signup" className="signup-image" />
      </div>
    </div>
  );
}

export default App;
