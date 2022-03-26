import * as React from "react";
import { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';
import SEO from '../components/SEO';

import { Fade, FadeAndSlide } from "../components/styles/Animations";

export const data = graphql`
    query {
        header: contentfulTitleAndParagraph(contentful_id: {eq: "1VKQOqnPMkSbcbbL001Kni"}) {
            title
            description: paragraph {
                raw
            }
        }
        mainImage: contentfulAsset(contentful_id: {eq: "37oczfDcvUTJX2bqWvAiDq"}) {
            gatsbyImageData(width: 1024, quality: 100)
        }
        allContentfulProject {
            projects: nodes {
                id
                slug
                client {
                    name
                    logo {
                        gatsbyImageData(placeholder: BLURRED)
                    }
                    logoWhite {
                        gatsbyImageData(placeholder: BLURRED)
                    }
                }
                title
                description {
                    raw
                }
                link
                preview {
                    preview {
                        gatsbyImageData(placeholder: BLURRED)
                    }
                }
                workOrder
            }
        }
    }
`;

export default function WorkPage({ data }) {
    
    const [odd, setOdd] = useState([]);

    const { title, description } = data.header;
    const { mainImage } = data;
    const { projects } = data.allContentfulProject;
    
    projects.sort((a, b) => a.workOrder - b.workOrder);

    const options = {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => <Description>{children}</Description>,
          [INLINES.HYPERLINK]: ({ data }, children) => <Site href={data.uri}>{children}</Site>
        }
    };

    // alternative to this would just be swap out img content via CSS, but doesn't work with GatsbyImage so JS workaround it is!:

    useEffect(() => { // gets every other project from the end up (so "first" is always purple)
        const arr = projects;
        arr.reverse();
        let newArr = arr.filter((element, index) => {
            return index % 2 === 1;
        });
        newArr.reverse();
        setOdd(newArr);
    }, [projects]);

    const swapLogo = (id) => { // if id matched during projects.map (white background), swaps logo to coloured
        for(let i = 0; i < odd.length; i++) {
            if (odd[i].id === id) {
                return true;
            };
        };
    };

    return (
        <>
            <SEO title="Portfolio" />
            <main>
                <Header $duration={0.4} $delay={0.2}>
                    <HeaderArticle>
                        <HeaderInfo>
                            <h2>{title}</h2>
                            {renderRichText(description)}
                        </HeaderInfo>
                        <ImageContainer $dip={1} $delay={0.325}>
                            <GatsbyImage 
                                image={mainImage.gatsbyImageData} 
                                loading="eager" 
                                alt="" 
                            />
                        </ImageContainer>
                    </HeaderArticle>
                </Header>
                {projects?.map((project) => (
                    <InView threshold={0.2} triggerOnce={true} key={project?.id}>
                        {({ inView, ref }) => (
                            <Section id={project?.slug} tabIndex="-1">
                                <ProjectContainer ref={ref}>
                                    <Project $active={inView} $dip={1}>
                                        <LogoContainer>
                                            <Logo 
                                                image={swapLogo(project.id) ? 
                                                    (getImage(project.client.logo) || getImage(project.client.logoWhite)) 
                                                    : (getImage(project.client.logoWhite) || getImage(project.client.logo))} 
                                                alt={project?.client?.name}
                                            />
                                        </LogoContainer>
                                        <Title>{project?.title}</Title>
                                        {project.description && renderRichText(project?.description, options)}
                                        <Site href={`http://${project?.link}`}>{project?.link}</Site>
                                    </Project>
                                    <GatsbyImg 
                                        $active={inView}
                                        $dip={1} 
                                        $delay={0.125} 
                                        image={project?.preview?.preview?.gatsbyImageData} 
                                        alt="" 
                                    />
                                </ProjectContainer>
                            </Section>
                        )}
                    </InView>
                ))}
            </main>
        </>
    )
};

const Section = styled.section`
    display: flex;
    background-color: #2b194d;
    color: white;
    justify-content: center;
    height: 100vh;
    padding: 4em 2em 4em;
    max-height: 800px;
    min-height: 700px;

    &:first-child {
        padding-bottom: 0;
    };

    &:nth-last-child(2n) {
        background-color: #f2f1f4;
        color: #2b194d;
    };

    @media only screen and (max-width: 767px) {
        max-height: none;
        height: auto;
        padding: 2em 2em 1em;
    };

    @media only screen and (max-width: 480px) {
        min-height: 770px;
    };
`;

const Header = styled(Section)`
    text-align: center;
    padding: 4em 2em 1em;
    opacity: 0;
    ${Fade};

    @media only screen and (max-width: 767px) {
        min-height: 500px;
    };
`;

const HeaderArticle = styled.article`
    position: relative;
    height: 100%;

    @media only screen and (max-width: 767px) {
        margin: 0 2em;
    };

    @media only screen and (max-width: 480px) {
        margin: 0 1em;
    };
`;

const HeaderInfo = styled.div`
    ${FadeAndSlide};
`;

const ImageContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    animation-delay: 0.125s;
    ${FadeAndSlide};
    
    @media only screen and (max-width: 767px) {
        display: none;
    };
`;

const ProjectContainer = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 1280px;

    @media only screen and (max-width: 767px) {
        margin: 0 2em;
    };

    @media only screen and (max-width: 480px) {
        margin: 0 1em;
    };
`;

const Project = styled.article`
    opacity: 0;
    ${props => props.$active ? FadeAndSlide : null};
    width: 32.20339%;

    @media only screen and (max-width: 767px) {
        width: 100%;
        text-align: center;
    };
`;

const GatsbyImg = styled(GatsbyImage)`
    opacity: 0;
    align-self: flex-start;
    margin-top: 3em;
    width: 57.62%;
    animation-delay: 0.125s;
    ${props => props.$active ? FadeAndSlide : null};
    
    @media only screen and (max-width: 767px) {
        display: none;
    };
`;

const Title = styled.small`
    display: inline-block;
    font-size: 1.25em;
    margin-bottom: 1em;
`;

const Description = styled.p`
    font-family: "Roboto";
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const Logo = styled(GatsbyImage)`
    width: 60%;
    vertical-align: bottom;
    margin-bottom: 0.25em;

    @media only screen and (max-width: 767px) {
        width: 30%;
    };

    @media only screen and (max-width: 480px) {
        width: 55%;
    };
`;

const Site = styled.a`
    color: #00BCD4;
    transition: all .2s linear;

    &:hover {
        color: #08e3ff;
        text-decoration: none;
        transition: all .2s linear;
    };
`;

const LogoContainer = styled.h2`
    padding-top: 0.5em;
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 0;
`;