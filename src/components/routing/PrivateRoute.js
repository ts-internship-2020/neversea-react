import React, { useMemo } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import {  withOidcSecure } from '@axa-fr/react-oidc-context';
import { emptyArray } from "utils/constants";

function PrivateRoute({ component: Component, ...rest }) {
    const SecuredComponent = useMemo(() => withOidcSecure(Component), [Component]);

    return <Route {...rest} component={SecuredComponent} />;
}

PrivateRoute.defaultProps = {
    roles: emptyArray,
    rights: emptyArray
};

PrivateRoute.propTypes = {
    component: PropTypes.func,
    roles: PropTypes.array,
    rights: PropTypes.array
};

export default PrivateRoute;
