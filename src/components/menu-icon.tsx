import React from 'react';
import { FloatProperty } from 'csstype';

interface Props {
    name: string
};

const IconStyle = {
    borderRadius: '50%',
    width:  '24px',
    height: '24px',
    float: 'right' as FloatProperty
    
};

export const MenuIcon = ({name}: Props) => (
    <img src={`${process.env.PUBLIC_URL}/assets/icons/${name}.svg`} style={IconStyle} />
)