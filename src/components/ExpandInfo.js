import React, { useState } from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS } from '@contentful/rich-text-types';
import styled from 'styled-components';

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
            <Button className={open ? "open" : null} onClick={() => setOpen(!open)}> {/* find way to make this more accessible? */}
                {renderRichText(content.info, options)}
            </Button>
        </React.Fragment>
    );
};

const H3 = styled.h3`
    margin: 0.75rem;
`;

const Button = styled.button`
    position: relative;
	/* display: block; */
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
        position: absolute;
        font-size: 40px;
        margin-left: 0;
        left: 50%;
        transform: translateX(-50%);
        top: 7px;
        opacity: 1;
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
        overflow: initial;

        :hover {
            transform: scale(1);
        };

        :before {
            height: 0;
            opacity: 0;
            transition: all .2s ease-out;
        };

        p {
            padding: 1rem;
            opacity: 1;
            transition: all .7s ease-in
        };
    };
`;

const Description = styled.p`
    /* height: 0; */
    font-family: "Open Sans";
	font-size: 1.4em;
	font-weight: 400;
	line-height: 28px;
	padding: .65em;
	text-align: left;
	opacity: 0;
`;