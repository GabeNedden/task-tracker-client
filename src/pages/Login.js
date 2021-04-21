import React, { useContext, useState } from 'react';
import { Button, Container, Form, Grid, Segment } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../utilities/hooks';


const Login = (props) => {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: ""
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData }}){
            context.login(userData);
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback(){
        loginUser()
    };

    return (
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
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        error={errors.password ? true : false}
                        onChange={onChange}
                    />
                    <Button inverted type="submit" primary>Login</Button>
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
                    content='Sign up'
                    icon='signup'
                    size='big'
                    as={Link}
                    to='/register' />
            </Grid.Column>
            </Grid>

        </Segment>
        </Container>
    );
};

const LOGIN_USER = gql`
        mutation login(
            $username: String!
            $password: String!
        ) {
            login(
                    username: $username
                    password: $password
            ){
                id
                email
                username
                createdAt
                token
            }
        }
    `

export default Login;