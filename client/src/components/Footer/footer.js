import React from "react";
import footerStyles from "./style";

const Footer = () => {
    let date = new Date();
    let year = date.getFullYear();

    return (
        <h5 style={footerStyles.footer}>©{year} Samuel Abioye. All rights reserved.</h5>
    )
}

export default Footer;