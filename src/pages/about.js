import * as React from "react"
import { graphql } from 'gatsby';
import { BLOCKS } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import styled from 'styled-components';
import SEO from '../components/SEO';

import { Fade } from "../components/styles/Animations";
import filler from '../images/amends/4.jpg';

export const data = graphql`
    query {
        intro: contentfulTitleAndParagraph(contentful_id: {eq: "8pDCcuIT8jxjOYic0yAgd"}) {
            title
            description: paragraph {
                raw
            }
        }
        skills: contentfulTitleAndParagraph(contentful_id: {eq: "1yx6zeKWyzVjT6oHpEcmxj"}) {
            title
            description: paragraph {
                raw
            }
        }
    }
`;

export default function AboutPage({ data }) {

    const { intro, skills } = data;

    const options = {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph duration={0.5} delay={0.5}>{children}</Paragraph>
        }
    };

    return (
        <>
            <SEO title="About me" />
            <Main>
                <Section>
                    <H2 $duration={0.5} $delay={0.25}>{intro.title}</H2>
                    {renderRichText(intro.description, options)}
                    <H2 $duration={0.5} $delay={0.25}>{skills.title}</H2>
                    {renderRichText(skills.description, options)}
                </Section>
                <Filler />
            </Main>
        </>
    )
};

const Main = styled.main`
    display: flex;
    flex-flow: column wrap;
    margin: 0 auto;
    width: 100%;
    text-align: center;
`;

const Section = styled.section`
    padding-top: 4em;
    padding-bottom: 4rem;

    @media only screen and (max-width: 767px) {
        padding-bottom: 0;
        margin: 0 2em;
    };

    @media only screen and (max-width: 480px) {
        margin: 0 1em;
    };
`;

const Filler = styled.div`
    width: 100%;
    height: 650px;
    background-image: url(${filler});
    background-attachment: fixed;
    background-size: cover;

    @media only screen and (max-width: 767px) {
        height: 300px;
        min-height: 35vh;
    };
`;

const Paragraph = styled.p`
    margin: 1.5em auto;
    max-width: 800px;
    text-align: left;
    ${Fade};

    a {
        color: #2b194d;
    };

    @media only screen and (max-width: 480px) {
        text-align: left;
        font-size: 1.2em;
        margin: 0;
    };
`;

const H2 = styled.h2`
    padding: 3rem 0;
    ${Fade};
`;