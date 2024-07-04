// @ts-nocheck
import * as React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { TextInput as DSInput } from '@strapi/design-system/TextInput';

import { Tooltip } from '@strapi/design-system/Tooltip';
import { Box, Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system';

const LinkInput = React.forwardRef((props, ref) => {
  const {
    attribute,
    disabled,
    intlLabel,
    name,
    onChange,
    required,
    value,    
    description,
    error,
  } = props;

  const { formatMessage } = useIntl();
  const [urlError, setUrlError] = React.useState('');

  const handleUrlChange = (e) => {
    const newUrl = e.currentTarget.value;
    const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(newUrl);
    if (!isValidUrl) {
      setUrlError('Please enter a valid URL');
    } else {
      setUrlError('');
    }

    onChange({
      target: { name, type: attribute.type, value: newUrl },
    });
  };

  

  return (
    <Box>
      <Field name={name} error={urlError || error} hint={description && formatMessage(description)}>
        <FieldLabel>{formatMessage(intlLabel)}</FieldLabel>
        <Tooltip description={formatMessage({ id: 'cskills-link.url.tooltip', defaultMessage: 'Enter a full URL, including http:// or https://' })}>
          <DSInput
            ref={ref}
            name={name}
            disabled={disabled}
            value={value || ''}
            required={required}
            onChange={handleUrlChange}
            label={formatMessage({
              id: 'cskills-link.link.label',
              defaultMessage: 'URL',
            })}
            placeholder={formatMessage({
              id: 'cskills-link.link.placeholder',
              defaultMessage: 'Enter a URL',
            })}
            type="url"
          />
        </Tooltip>
        {urlError && <FieldError>{urlError}</FieldError>}
        <FieldHint />
      </Field>
      
    </Box>
  );
});

LinkInput.propTypes = {
  attribute: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  intlLabel: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  description: PropTypes.object,
  error: PropTypes.string,
};

export default LinkInput;
