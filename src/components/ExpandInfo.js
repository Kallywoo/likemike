import React, { useState } from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS } from '@contentful/rich-text-types';
import styled, { keyframes } from 'styled-components';

export const ExpandInfo = ({ content }) => {

    const [open, setOpen] = useState(false);

    const options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Description>{children}</Description>
        }
    };

    return (
        <React.Fragment key={content.id}>
            <H3>{content.title}</H3>
            <Button 
                onClick={() => setOpen(!open)} 
                className={open ? "open" : null} 
                aria-label={!open ? `Find out more about my ${content.title} experience` : `Close ${content.title} information`}
            >
                {open && renderRichText(content.info, options)}
            </Button>
            <A11y aria-live="polite">{open && renderRichText(content.info, options)}</A11y>
        </React.Fragment>
    );
};

const A11y = styled.div`
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
`;

const H3 = styled.h3`
    margin: 0.75rem;
`;

const Button = styled.button`
    position: relative;
    border-radius: 16px;
    height: 32px;
    width: 32px;
    background: #aceef7;
    color: #2B194D;
    margin: .25em auto;
    box-shadow: 2px 2px 5px #060410;
    line-height: 18px;
    cursor: pointer;
    transition: all .2s ease-out;
    padding: 0;
    overflow: hidden;
    border-style: none;
  
    &:before {
        /* bit low in firefox.. find way to make it look nicer? */
        position: absolute;
        margin-left: 0;
        top: 7px;
        left: 50%;
        opacity: 1;
        font-size: 2.5em;
        transform: translateX(-50%);
        transition: all .75s ease-out;
        content: "+";
    };

    &:hover {
        transition: all .2s ease-out;
        box-shadow: 3px 3px 3px #160d27;
    };

    &.open {
        display: flex;
        height: 370px;
        width: 300px;
        line-height: 30px;
        transition: all .2s ease-out;

        :hover {
            transform: scale(1);
        };

        :before {
            height: 0;
            opacity: 0;
            transition: all .2s ease-out;
        };
    };
`;

const fadeIn = keyframes`
    0% { opacity: 0; transform: translate(-1.2%, -1.2%); };
    100% { opacity: 1; transform: translate(0, 0); };
`;

const Description = styled.p`
    font-family: "Open Sans";
    font-size: 1.4em;
    font-weight: 400;
    line-height: 28px;
    text-align: left;
    padding: 1rem;
    animation: ${fadeIn} .7s ease-in forwards;
`;