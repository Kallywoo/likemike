import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

// import favicon from '/static/favicon.svg';
import altFavicon from '/static/favicon.ico';

export default function SEO({ children, location, description, title }) {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `);

    return (
        <Helmet titleTemplate={`${site.siteMetadata.title} - %s`}>
            <html lang="en" />
            <title>{title}</title>
            {/* meta tags */}
            {/* <link rel="icon" type="image/svg+xml" href={favicon}/> */}
            <link rel="icon" href={altFavicon} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="utf-8" />
            {/* <meta name="keywords" content="" /> */}
            <meta name="description" content={description ? `${description} | ${site.siteMetadata.description}` : site.siteMetadata.description} />
            {/* open graph */}
            {location && <meta property="og:url" content={location.href} />}
            <meta property="og:image" content={altFavicon} />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta property="og:site_name" content={site.siteMetadata.title} key="ogsitename" />
            <meta property="og:description" content={description ? `${description} | ${site.siteMetadata.description}` : site.siteMetadata.description} key="ogdesc" />
            {children}
            <script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>
        </Helmet>
    );
};