import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

const AdminPrivate = ({ children, ...rest }) => {
    const admin = sessionStorage.getItem('admin')

    return (
        <Route
            {...rest}
            render={({ location }) =>
                admin ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default AdminPrivate;