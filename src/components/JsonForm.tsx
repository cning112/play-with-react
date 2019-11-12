import React, { Fragment } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';

import { person } from '@jsonforms/examples';
import { Divider } from '@material-ui/core';

export function Person() {
  const { schema, uischema, data } = person;
  return (
    <Fragment>
      <p>{JSON.stringify(schema)}</p>
      <Divider></Divider>
      <p>{JSON.stringify(uischema)}</p>
      <Divider></Divider>
      <p>{JSON.stringify(uischema)}</p>
      <Divider></Divider>
      <p>{JSON.stringify(data)}</p>
      <Divider></Divider>
      <JsonForms schema={schema} uischema={uischema} data={data} renderers={materialRenderers} />;
    </Fragment>
  );
}
