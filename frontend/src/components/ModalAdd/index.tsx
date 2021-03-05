import React, { useState, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { productRequestAdd } from '../../store/ducks/products/actions';
import { Product, ProductState } from '../../store/ducks/products/types';

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import CloudUpload from '@material-ui/icons/CloudUpload';
import swal from 'sweetalert';

import { Form } from './styles';

interface propsModal {
  open: boolean;
  openModal: (open: boolean) => void;
}

interface stateProps {
  products: ProductState;
}

function ModalAdd(props: propsModal) {
  const [product, setProduct] = useState<Product | any>(undefined);
  const [file, setFile] = useState<string>('');
  const inputFileRef = useRef<HTMLInputElement>(null);
  const loading = useSelector((state: stateProps) => state.products.loading);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  function close() {
    props.openModal(false);
  }

  function handleInputUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if(e.target.files) {
      setProduct({
        ...product,
        photo: e.target.files[0],
      });
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleButtonUpload() {
    inputFileRef?.current?.click();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  function save() {

    if(!product?.name || !product?.description || !product?.price || !product?.expiration_date) {
      setError(true);
      return;
    }

    if(!product?.photo) {
      swal('Select photo the product, Please!', {
        dangerMode: true,
        buttons: {
          confirm: true,
        },
      });
      return;
    }

    dispatch(productRequestAdd(product));
    setProduct(null);
    setFile('');
    props.openModal(false);
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={props.open}>
      <DialogContent>
        <Form>
          <TextField
            id="standard-basic"
            fullWidth
            label="Name"
            name="name"
            error={error}
            value={product?.name}
            onChange={handleInputChange}
            /><br />
          <TextField
            id="standard-basic"
            fullWidth
            label="Description"
            name="description"
            error={error}
            value={product?.description}
            onChange={handleInputChange}
          /><br />
          <TextField
            id="standard-basic"
            fullWidth
            label="Price"
            name="price"
            error={error}
            value={product?.price}
            onChange={handleInputChange}
          /><br />
          <TextField
            id="standard-basic"
            fullWidth
            label="Date"
            name="expiration_date"
            placeholder="dd/mm/yyyy"
            error={error}
            value={product?.expiration_date}
            onChange={handleInputChange}
          /><br />
          <div className="file-container">
            <input
              accept="image/*"
              className="input-button-file"
              name="photo"
              ref={inputFileRef}
              onChange={handleInputUpload}
              type="file"
            />
            <Button
              className="button-file"
                variant="contained"
                color="default"
                startIcon={<CloudUpload />}
                onClick={handleButtonUpload}
              >
              Upload
            </Button>
            {file && <Avatar src={file} />}
          </div>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={close}>
          Close
        </Button>
        <Button color="primary" onClick={save}>
          {loading ? <CircularProgress size={15} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalAdd;