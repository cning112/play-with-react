import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Upload } from 'antd';
import { Button, Box, Typography } from '@material-ui/core';

interface Props {
  name: string;
  // beforeUpload: (f: File | Blob) => ;
  // onDownload?: (f: File) => void;
  accept?: string;
  // handleUpload: any;
  onSelect: (d: any) => void;
  // @ts-ignore
  register;
  // @ts-ignore
  setValue;
  // @ts-ignore
  setError;
}

export default function FileUpload(props: Props) {
  const { name, register, setValue, setError } = props;

  function beforeUpload(f: File, fileList: object[]) {
    console.log(f);
    props.onSelect({ f, fileList });
    setValue(name, f);
    return false; // stop action
  }

  useEffect(() => {
    register({
      name: name
    });
    setValue(name, undefined);
  }, []);

  return (
    <Upload {...{ ...props, beforeUpload, multiple: false }} name={name}>
      <Box component="label" mr={2}>
        <Typography display="inline">{name}: </Typography>
      </Box>
      <Button variant="outlined">
        <AddIcon />
        select file
      </Button>
    </Upload>
  );
}
