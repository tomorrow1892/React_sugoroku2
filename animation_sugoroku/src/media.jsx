import {
    css,
    CSSObject,
    FlattenSimpleInterpolation,
    SimpleInterpolation,
} from 'styled-components';

export const sp = (
    first,
    ...interpolations
)=> css`
    @media (max-width: 560px) {
        ${css(first, ...interpolations)}
    }
`;

export const tab = (
    first,
    ...interpolations
) => css`
    @media (min-width: 561px) and (max-width: 1024px) {
        ${css(first, ...interpolations)}
    }
`;
export const pc = (
    first,
    ...interpolations
) => css`
    @media (min-width: 1025px) {
        ${css(first, ...interpolations)}
    }
`;

export const xs = (
    first,
    ...interpolations
) => css`
    @media (min-width: 0px) and (max-width: 600px) {
        ${css(first, ...interpolations)}
    }
`;

export const sm = (
    first,
    ...interpolations
) => css`
    @media (min-width: 601px) and (max-width: 900px) {
        ${css(first, ...interpolations)}
    }
`;
export const md = (
    first,
    ...interpolations
) => css`
    @media (min-width: 901px) and (max-width: 1200px) {
        ${css(first, ...interpolations)}
    }
`;

export const lg = (
    first,
    ...interpolations
) => css`
    @media (min-width: 1201px) and (max-width: 1535px) {
        ${css(first, ...interpolations)}
    }
`;
export const xl = (
    first,
    ...interpolations
) => css`
    @media (min-width: 1537px) {
        ${css(first, ...interpolations)}
    }
`;