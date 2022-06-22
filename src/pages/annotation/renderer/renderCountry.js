import * as React from 'react';
import Box from '@mui/material/Box';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const Country = /*#__PURE__*/React.memo(function Country(props) {
  const {
    value
  } = props;
  return /*#__PURE__*/_jsxs(Box, {
    sx: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      '&  > img': {
        mr: 0.5,
        flexShrink: 0,
        width: '20px'
      }
    },
    children: [/*#__PURE__*/_jsx("img", {
      loading: "lazy",
      width: "20",
      src: `https://flagcdn.com/w20/${value.code.toLowerCase()}.png`,
      srcSet: `https://flagcdn.com/w40/${value.code.toLowerCase()}.png 2x`,
      alt: ""
    }), /*#__PURE__*/_jsx(Box, {
      component: "span",
      sx: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      children: value.label
    })]
  });
});
export function renderCountry(params) {
  if (params.rowNode.isAutoGenerated || !params.value) {
    return '';
  }

  return /*#__PURE__*/_jsx(Country, {
    value: params.value
  });
}