import React from 'react';
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions/addTodo';
import './addTodo.css';

const AddTodo = ({addTodo}) => {
    const initialValues = {
        todo: ''
    };

    const validationSchema = Yup.object({
        todo: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(100, 'Must be 100 characters or less')
            .required('Required')
    });

    const onSubmit = (values, {resetForm}) => {
        addTodo(values.todo);
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <Field
                        className="input-todo"
                        type="text"
                        name="todo"
                        placeholder="Add Todo..."
                    />
                    

                    <button className="add-todo" type="submit">Add Todo</button>
                    {errors.todo && touched.todo ? (<div className="error-todo">{errors.todo}</div>) : null}
                    <div>
                        
                    </div>
                </Form>
            )}
        </Formik>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        addTodo: todo => dispatch(addTodo(todo))
    };
};

export default connect(null, mapDispatchToProps)(AddTodo);
