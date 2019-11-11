import React, { Fragment, useState, Ref, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Upload, Icon, message } from 'antd';
import { Button, Box, Typography, InputLabel, FormControl, FormLabel } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  })
);

interface Props {
  name: string;
  // beforeUpload: (f: File | Blob) => ;
  // onDownload?: (f: File) => void;
  accept?: string;
  // handleUpload: any;
  onSelect: (d: any) => void;
  // @ts-ignore
  register;
}

export default function FileUpload(props: Props) {
  const classes = useStyles();
  const { register } = props;

  // useEffect(() => {
  //   register({ name: props.name });
  // }, [register]);

  function beforeUpload(f: File, fileList: object[]) {
    props.onSelect({ f, fileList });
    return false;
    // setFileList(prevList => [...prevList, f]);
  }

  return (
    <Box display="inline">
      {/* <Upload {...{ ...props, beforeUpload, multiple: false }} name={props.name}>
        <Box component="label" mr={2}>
          <Typography display="inline">{props.name}: </Typography>
        </Box>
        <Button variant="outlined">
          <AddIcon />
          select file
        </Button>
      </Upload> */}
      <input type="text" name="haha" ref={register({ required: true, minLength: 4 })}></input>
    </Box>

    // <input style={{ display: 'none' }} id="uploadfile" multiple type="file" />
    // <label htmlFor="uploadfile">
    //   <Button variant="outlined" color="primary" component="span">
    //     Upload
    //     <AddIcon />
    //   </Button>
    // </label>
  );
}
