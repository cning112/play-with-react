import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import Stepper from 'src/components/Stepper';
import { ProjectInfo, StepInfo } from 'src/types';
import { Typography, Button, Theme, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FileUpload from 'src/components/Inputs/FileUpload';
import useForm from 'react-hook-form';

function getProject(id: string): ProjectInfo {
  return {
    id: id,
    name: 'MCR',
    description: 'MMCCRR',
    endpoint: '/mcr'
  };
}

function getSteps(): StepInfo[] {
  return [
    {
      name: 'step1',
      description: 'step1: upload file',
      endpoint: '/mcr/upload_and_parse_file',
      method: 'post',
      parameters: [{ id: 'f1', type: 'file', name: 'file-1' }]
    },
    {
      name: 'step2',
      description: 'step2: submit form'
      // endpoint: '/mcr/submit_and_get_result',
      // method: 'post',
      // parameters: {
      //   {name: 'file-1'}
      // }
    },
    {
      name: 'step3',
      description: 'step3: get data'
    }
  ];
}

function getStep(index: number): StepInfo {
  return getSteps()[index];
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    display: 'none'
  }
}));

// function FileUpload({ label, description, accept }) {
//   return (
//     <Fragment>
//       <p>
//         <Typography display="inline" variant="h6">
//           {label}:
//         </Typography>

//         <input accept={accept || '*'} style={{ display: 'none' }} id="raised-button-file" type="file" />
//         <label htmlFor="raised-button-file">
//           <Button variant="contained" component="span">
//             Upload
//           </Button>
//         </label>
//       </p>
//     </Fragment>
//   );
// }

export default function Project() {
  const { id } = useParams();
  const classes = useStyles();

  const projInfo = getProject(id || '');
  const steps = getSteps();

  const [activeStep, setActiveStep] = useState(0);

  const { register, triggerValidation, getValues, errors, handleSubmit, formState } = useForm();

  const onSubmit = (data: any) => {
    console.log('submitting', data);
  };

  function currStep(index: number) {
    const step = steps[index];
    const param = step.parameters ? step.parameters[0] : { name: '123', id: '123abc', type: 'file' };
    return (
      <form id={step.name} onSubmit={handleSubmit(onSubmit)}>
        {(step.parameters || []).map(param => (
          <FileUpload
            key={param.name}
            {...{
              ...param,
              register,
              onSelect: onSubmit
            }}
          ></FileUpload>
        ))}
        {errors.haha && 'haha is required'}
        <button type="submit"> Check</button>
      </form>
    );
  }

  async function handleNext() {
    const validated = await triggerValidation();
    console.log('validated', validated);
    alert(JSON.stringify(errors));
    if (validated) {
      const f = document.getElementById(steps[0].name);
      if (f) {
        (f as HTMLFormElement).submit();
      }
      setActiveStep(prev => prev + 1);
    }
  }
  function handlePrev() {
    setActiveStep(prev => prev - 1);
  }

  return (
    <Fragment>
      <Typography variant="h2">{projInfo.name}</Typography>
      <p>{JSON.stringify(formState)}</p>
      {/* <p>{JSON.stringify(errors)}</p> */}
      <p>{JSON.stringify(getValues())}</p>
      <Stepper {...{ steps, activeStep, handleNext, handlePrev }}>{currStep(activeStep)}</Stepper>
    </Fragment>
  );
}
