import React, { Fragment } from 'react';
import AdminHeader from './AdminHeader';

const AdLayout = ({ children }) => {

    return (
        <Fragment>
            <AdminHeader />
            {children}
        </Fragment>
    );
};

export default AdLayout;
