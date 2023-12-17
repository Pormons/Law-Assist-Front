import React from "react";

export default function Show(props) {

    return (
        props.loading ? props.fallback : props.children
    );
}