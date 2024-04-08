import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import Typography from '../../themes/typography';
import {colors} from '../../themes';

//Text Component
const GText = ({type, style, align, color, children, ...props}) => {
  const fontWeights = () => {
    switch (type.charAt(0).toUpperCase()) {
      case 'R':
        return Typography.fontWeights.Regular;
      case 'M':
        return Typography.fontWeights.Medium;
      case 'S':
        return Typography.fontWeights.SemiBold;
      case 'B':
        return Typography.fontWeights.Bold;
      default:
        return Typography.fontWeights.Regular;
    }
  };

  const fontSize = () => {
    switch (type.slice(1)) {
      case '8':
        return Typography.fontSizes.f8;
      case '12':
        return Typography.fontSizes.f12;
      case '14':
        return Typography.fontSizes.f14;
      case '16':
        return Typography.fontSizes.f16;
      case '18':
        return Typography.fontSizes.f18;
      case '20':
        return Typography.fontSizes.f20;
      case '22':
        return Typography.fontSizes.f22;
      case '24':
        return Typography.fontSizes.f24;
      case '26':
        return Typography.fontSizes.f26;
      case '28':
        return Typography.fontSizes.f28;
      case '30':
        return Typography.fontSizes.f30;
      case '32':
        return Typography.fontSizes.f32;
      case '34':
        return Typography.fontSizes.f34;
      case '35':
        return Typography.fontSizes.f35;
      case '36':
        return Typography.fontSizes.f36;
      case '40':
        return Typography.fontSizes.f40;
      case '42':
        return Typography.fontSizes.f42;
      case '46':
        return Typography.fontSizes.f46;
      default:
        return Typography.fontSizes.f14;
    }
  };

  return (
    <Text
      style={[
        type && {...fontWeights(), ...fontSize()},
        {color: color ? color : colors.textColor},
        align && {textAlign: align},
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default React.memo(GText);
