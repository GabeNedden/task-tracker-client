import React, { useContext, useState } from 'react';
import { Button, Container, Form, Grid, Segment } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../utilities/hooks';


const Register = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData}}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUser(){
        addUser();
    }

    return (
        <Segment
              inverted
              
              textAlign='center'
              style={{ minHeight: 100, padding: '1em 0em' }}
              vertical
            >
        <Container>
        <Segment inverted placeholder style={{marginTop: 50, height: 380}}>
            <Grid columns={2} relaxed='very' stackable>
    
            <Grid.Column>
                <Form inverted onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <Form.Input
                        label="Username"
                        placeholder="Username"
                        name="username"
                        type="text"
                        value={values.username}
                        error={errors.username ? true : false}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Email"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        error={errors.email ? true : false}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        error={errors.password ? true : false}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        onChange={onChange}
                    />
                    <Button inverted type="submit">Register</Button>
                </Form>
                {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                        <li key={value}>{value}</li> 
                        ))}
                    </ul>
                </div>
                )}
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
                <Button
                    inverted
                    content='Login'
                    icon='bicycle'
                    size='big'
                    as={Link}
                    to='/login' />
            </Grid.Column>
            </Grid>

        </Segment>
        </Container>
        </Segment>
    );
};

const REGISTER_USER = gql`
        mutation register(
            $username: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
        ) {
            register(
                registerInput: {
                    username: $username
                    email: $email
                    password: $password
                    confirmPassword: $confirmPassword
                }
            ){
                id
                email
                username
                createdAt
                token
            }
        }
    `

export default Register;