// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.scss';
// import App from './App';
import * as serviceWorker from '../serviceWorker';
import axios from 'axios';

// ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/antd';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const actions = createFormActions();

export const TestForm = () => {
  const schema = {
    type: 'object',
    properties: {
      radio: {
        type: 'radio',
        default: '3',
        enum: ['1', '2', '3', '4'],
        title: 'Radio'
      },
      select: {
        type: 'string',
        default: '4',
        enum: ['1', '2', '3', '4'],
        title: 'Select',
        required: true
      },
      checkbox: {
        type: 'checkbox',
        enum: ['1', '2', '3', '4'],
        title: 'Checkbox',
        required: true
      },
      textarea: {
        type: 'string',
        'x-component': 'textarea',
        title: 'TextArea'
      },
      number: {
        type: 'number',
        title: 'number'
      },
      boolean: {
        type: 'boolean',
        title: 'boolean'
      },
      date: {
        type: 'date',
        title: 'date'
      },
      daterange: {
        type: 'daterange',
        default: ['2018-12-19', '2018-12-19'],
        title: 'daterange'
      },
      year: {
        type: 'year',
        title: 'year'
      },
      time: {
        type: 'time',
        title: 'time'
      },
      upload: {
        type: 'upload',
        'x-props': {
          listType: 'card',
          accept: '.txt'
        },
        title: 'upload(card)'
      },
      upload2: {
        type: 'upload',
        'x-props': {
          listType: 'dragger'
        },
        title: 'uplaod(dragger)'
      },
      upload3: {
        type: 'upload',
        'x-props': {
          listType: 'text'
        },
        title: 'upload(text)'
      },
      range: {
        type: 'range',
        'x-props': {
          min: 0,
          max: 1024,
          marks: [0, 1024]
        },
        title: 'range'
      },
      transfer: {
        type: 'transfer',
        enum: [
          {
            key: 1,
            title: 'opt1'
          },
          {
            key: 2,
            title: 'opt2'
          }
        ],
        'x-props': {
          render: (item: { title: string }) => item.title
        },
        title: 'transfer'
      },
      rating: {
        type: 'rating',
        title: 'rating'
      },
      layout_btb_group: {
        type: 'object',
        'x-component': 'button-group',
        'x-component-props': {
          offset: 7,
          sticky: true
        },
        properties: {
          submit_btn: {
            type: 'object',
            'x-component': 'submit',
            'x-component-props': {
              children: 'Submit'
            }
          },
          reset_btn: {
            type: 'object',
            'x-component': 'reset',
            'x-component-props': {
              children: 'Reset'
            }
          }
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: '80%', textAlign: 'center' }}>
      <Button onClick={sendData}></Button>
      <SchemaForm actions={actions} schema={schema} />
    </div>
  );
};

function sendData() {
  const fd = new FormData();
  // const data = {
  //   product: 'mbp',
  //   price: '1200.0',
  //   tax: '0.2'
  // };
  var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
  var blob = new Blob([content], { type: 'text/xml' });
  // fd.append('params', data);
  fd.append('product', 'mbp');
  fd.append('price', '1200.0');
  fd.append('tax', '0.2');
  fd.append('file', blob);
  axios
    .post('http://localhost:5000/step/form_dep_cls', fd)
    // .post('http://localhost:5000/step/form_weak', fd)
    .then(console.log)
    .catch(console.error);
}
