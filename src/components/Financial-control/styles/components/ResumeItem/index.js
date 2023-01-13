import React from 'react';
import * as C from './styles';

const ResumeItem = ({ title, Icon, color, value }) => {
    const handleValue = Number(value).toLocaleString(process.env.REACT_APP_LANG, { style: 'currency', currency: process.env.REACT_APP_CURRENCY })
    return ( 
        <C.Container>
            <C.Header>
                <C.HeaderTitle>{title}</C.HeaderTitle>
                <Icon color={color} />
            </C.Header>
            <C.Total>{handleValue}</C.Total>
        </C.Container>
     );
}
 
export default ResumeItem;