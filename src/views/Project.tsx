import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Stepper from 'src/components/Stepper';
import { ProjectInfo, StepInfo } from 'src/types';
import { Typography, Button, Theme, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FileUpload from 'src/components/Inputs/FileUpload';
import TextInput from 'src/components/Inputs/TextInput';
import useForm from 'react-hook-form';
import axios from 'axios';
import { Person } from 'src/components/JsonForm';

// function getProject(id: string): ProjectInfo {
//   return {
//     id: id,
//     name: 'MCR',
//     description: 'MMCCRR',
//     endpoint: '/mcr'
//   };
// }

// function getSteps(): StepInfo[] {
//   return [
//     {
//       name: 'step1',
//       description: 'step1: upload file',
//       endpoint: '/mcr/upload_and_parse_file',
//       method: 'post',
//       parameters: [{ id: 'f1', type: 'file', name: 'file-1' }]
//     },
//     {
//       name: 'step2',
//       description: 'step2: submit form'
//     },
//     {
//       name: 'step3',
//       description: 'step3: get data'
//     }
//   ];
// }

// function getStep(index: number): StepInfo {
//   return getSteps()[index];
// }

// const useStyles = makeStyles((theme: Theme) => ({
//   input: {
//     display: 'none'
//   }
// }));

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
  // const classes = useStyles();

  // const projInfo = getProject(id || '');
  // const steps = getSteps();

  const [projInfo, setProjInfo] = useState<ProjectInfo | undefined>();
  const [steps, setSteps] = useState<StepInfo[]>([]);
  const [error, setAxiosError] = useState<Error | undefined>();

  useEffect(() => {
    Promise.all([
      axios.get('http://www.mocky.io/v2/5dc9e7862f000082ea73ef54'),
      axios.get('http://www.mocky.io/v2/5dc9e2c72f000015ec73ef3e?mocky-delay=500ms')
    ])
      .then(([r1, r2]) => {
        setProjInfo(r1.data);
        setSteps(r2.data);
      })
      .catch(e => setError(e));
  }, []);

  const [activeStep, setActiveStep] = useState(0);

  const { register, setValue, setError, triggerValidation, getValues, errors, handleSubmit, formState } = useForm();

  const onSubmit = (data: any) => {
    console.log('submitting', data);
  };

  function currStep(index: number) {
    const step = steps[index];
    return (
      <Fragment>
        {step ? (
          <form id={step.name} onSubmit={handleSubmit(onSubmit)}>
            {(step.parameters || []).map(param => (
              <Fragment key={param.name}>
                <FileUpload
                  {...{
                    ...param,
                    register,
                    setValue,
                    setError,
                    onSelect: onSubmit
                  }}
                ></FileUpload>
                <TextInput
                  {...{
                    ...param,
                    name: param.name + '-input',
                    register,
                    rules: { required: true, minLength: 4 }
                  }}
                ></TextInput>
              </Fragment>
            ))}

            {errors.haha && 'haha is required'}
            <button type="submit"> Check</button>
          </form>
        ) : (
          <p>Nothing</p>
        )}
      </Fragment>
    );
  }

  async function handleNext() {
    const validated = await triggerValidation();
    console.log('validated', validated);
    if (validated) {
      const f = document.getElementById(steps[0].name);
      if (f) {
        console.log(f);
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
      <p>{JSON.stringify(formState)}</p>
      <p>{JSON.stringify(getValues())}</p>

      <Person></Person>

      {projInfo ? (
        <Fragment>
          <Typography variant="h2">{projInfo.name}</Typography>
          <Stepper {...{ steps, activeStep, handleNext, handlePrev }}>{currStep(activeStep)}</Stepper>
        </Fragment>
      ) : (
        <p>Loading</p>
      )}
    </Fragment>
  );
}
