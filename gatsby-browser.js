import React from 'react';
import { Layout } from './src/components/Layout';
import "@fontsource/open-sans";
import "@fontsource/open-sans/700.css";
import "@fontsource/roboto";

export function wrapPageElement({ element, props }) {
    return <Layout {...props}>{element}</Layout>
};