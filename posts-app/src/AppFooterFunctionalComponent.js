import React, { Fragment } from "react";

export default function AppFooterFunctionalComponent(props) {
    const currentYear = new Date().getFullYear();
        return (
            <Fragment>
                <hr />
                <p className="footer">Copyright &copy; 2020 - { currentYear } {props.acme}</p>
            </Fragment>
        );
}