import React, { useEffect, useState } from 'react';
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import { useRequest, useLocalStorageState } from '@umijs/hooks';
import { ProjectInfo, Step, FormField } from 'src/types';
import { axios } from 'src/plugins/axios';
import { Divider, Button, Checkbox, TextField, TextareaAutosize, FormControlLabel } from '@material-ui/core';
import { FormContext, useFormContext, Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { DatePicker } from 'antd';

function getProjectInfo(projId: string): Promise<ProjectInfo> {
  console.log('fetching project info', projId);
  return axios.get(`/api/v1/${projId}/info`).then(d => d.data);
}

export default function Project() {
  const { id } = useParams();
  const { data: project, error, loading } = useRequest(getProjectInfo, { defaultParams: [id] });
  const { path, url } = useRouteMatch();

  if (error) {
    return <div>Failed to load project info</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <h1>{project.name}</h1>
      <h3>{project.description}</h3>
      <Divider></Divider>

      <Workflow project={project}></Workflow>
    </>
  );
}

function proceed(url: string, data?: FormData): Promise<Step> {
  console.log('proceed', url);
  if (data) {
    return axios.post(url, data).then(d => d.data);
  } else {
    return axios.get(url).then(d => d.data);
  }
}

function Workflow({ project }) {
  const formHooks = useForm();
  const { data: step, error, loading, run } = useRequest(proceed, { defaultParams: [project.startWith] });
  const [formData, setFormData] = useLocalStorageState('step-data', {});

  const submitData = (data: object) => {
    setFormData(data);
    const fd = new FormData();
    Object.keys(data).forEach(k => {
      fd.append(k, data[k]);
    });

    const url = `/api/v1/${project.id}/step/${step.id}`;
    console.log('submitting data', url, data);
    // run(url, fd);
  };
  console.log('render Workflow');

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <>
      <h1>{step.name}</h1>
      <p>{step.description}</p>
      {error && <div>Error</div>}
      {step.parameters && (
        <FormContext {...formHooks}>
          <UiForm parameters={step.parameters} onSubmit={() => formHooks.handleSubmit(submitData)}></UiForm>
        </FormContext>
      )}
      {step.results && <p>{JSON.stringify(step.results)}</p>}
      {formData && <pre style={{ textAlign: 'left' }}>{JSON.stringify(formData, null, 2)}</pre>}
    </>
  );
}

function UiForm({ parameters, onSubmit }) {
  const { register, errors, control } = useFormContext();
  return (
    <>
      {parameters.map(f => (
        <p key={f.id}>{JSON.stringify(f)}</p>
      ))}
      <Divider></Divider>
      <form>
        <section>
          <label>MUI Checkbox</label>
          <Controller as={<Checkbox />} name="Checkbox" type="checkbox" control={control} />
        </section>
        {parameters.map(p => (
          <section key={p.id}>
            <label>{p.name}</label>
            <FieldComponent field={p} control={control} />
            {/* <input ref={register({ minLength: 3 })} name={p.id} type={p.type}></input> */}
            {errors[p.id] && 'is required'}
          </section>
        ))}
      </form>
      <div>
        <Button onClick={onSubmit()} variant="outlined">
          Back
        </Button>
        <Button onClick={onSubmit()} variant="outlined">
          Next
        </Button>
        <Button onClick={onSubmit()} variant="outlined">
          Save
        </Button>
        <Button onClick={onSubmit()} variant="outlined">
          Reset
        </Button>
      </div>
    </>
  );
}

function FieldComponent({ field, control }) {
  switch (field.type) {
    case 'checkbox':
      return (
        <Controller
          name={field.id}
          as={<FormControlLabel control={<Checkbox {...field} />} label="Secondary" />}
          // type="checkbox"
          // defaultChecked={field.defaultValue}
          control={control}
          // checked={field.defaultValue}
          // checked
          // valueName="checked"
          // onChange={checked => {
          //   // return { value: checked[1] };
          //   console.log('checked', checked);
          //   return { value: checked[1] };
          // }}
        />
      );
    case 'textarea':
      return (
        <Controller
          name={field.id}
          as={<TextareaAutosize rowsMin={4} placeholder={field.description} />}
          value={field.defaultValue || ''}
          control={control}
        />
      );
    case 'text':
      return (
        <Controller name={field.id} as={<TextField />} defaultValue={field.defaultValue || ''} control={control} />
      );
    case 'number':
      return (
        <Controller
          name={field.id}
          type="number"
          as={<TextField />}
          // defaultValue={field.defaultValue || 0}
          control={control}
        />
      );
    case 'select':
      return (
        <Controller
          name={field.id}
          as={<Select />}
          options={field.options.map((v, k) => ({ value: v, label: v }))}
          isClearable
          defaultValue={field.defaultValue}
          control={control}
          onChange={([selected]) => {
            console.log('selected', selected);
            // return selected;
            return { value: selected };
          }}
        />
      );
    case 'select-multiple':
      return (
        <Controller
          name={field.id}
          as={<Select />}
          options={field.options}
          isMulti
          isClearable
          defaultValue={field.defaultValue}
          control={control}
          onChange={([selected]) => {
            return { value: selected };
          }}
        />
      );
    case 'file':
      return <Controller name={field.id} accept={field.accept || '*'} type="file" as="input" control={control} />;
    case 'date':
      return (
        <Controller
          name={field.id}
          as={<DatePicker />}
          selected={new Date()}
          control={control}
          onChange={([selected]) => {
            return { value: selected };
          }}
        />
      );
    case 'default':
      return (
        <p>
          Unknown type {': '} {field.type}
        </p>
      );
  }
}

// function DateField({ defaultValue }) {
//   const [startDate, setStartDate] = useState(defaultValue || new Date());
//   return <DatePicker selected={startDate} onChange={date => setStartDate(date)} />;
// }
