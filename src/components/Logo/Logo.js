import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconLogo from './IconLogo';
import css from './Logo.module.css';

import MobileLogoImage from './Habitat_Logo_White.png';
import DesktopLogoImage from './Habitat_Logo_White.png';

const Logo = props => {
  // const { className, format, ...rest } = props;
  // const mobileClasses = classNames(css.logoMobile, className);

  const { className, format, ...rest } = props;
  const isMobile = format !== 'desktop';
  const classes = classNames(className, { [css.logoMobile]: isMobile });
  const logoImage = isMobile ? MobileLogoImage : DesktopLogoImage;
  // If you want to use image instead of svg as a logo you can use the following code.
  // Also, remember to import the image as LogoImage here.
  // <img className={className} src={LogoImage} alt={config.siteTitle} {...rest} />

  return (
    // <IconLogo
    //   className={format === 'desktop' ? className : mobileClasses}
    //   format={format}
    //   {...rest}
    // />
    <img className={classes} src={logoImage} alt={'Habitat Hero'} {...rest} />
  );
};

const { oneOf, string } = PropTypes;

Logo.defaultProps = {
  className: 'defaultLogo',
  format: 'desktop',
};

Logo.propTypes = {
  className: string,
  format: oneOf(['desktop', 'mobile']),
};

export default Logo;
