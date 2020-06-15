import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';import React, { useState } from 'react';
import { CreationProjectModel } from '../../models/ProjectModel';

export interface NewProjectDialogProps {
    open: boolean;

    onClose: (output: CreationProjectModel | undefined) => void;
}

export const NewProjectDialog = (props: NewProjectDialogProps) => {
    const [projectName, setProjectName ] = useState('New Project');

    const handleAbort = () => {
      props.onClose(undefined);
    };
  
    const handleOk = () => {
      props.onClose({
          name: projectName
        });
    };

    return (
        <Dialog open={props.open} onClose={handleAbort} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create New Project</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter the details about your new project
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                value={projectName}
                onChange={({target})=> setProjectName(target.value)}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleAbort} color="primary">
                Cancel
            </Button>
            <Button onClick={handleOk} color="primary">
                Ok
            </Button>
            </DialogActions>
        </Dialog>
    );
}