import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  productRequestEdit,
  productSelectedEdit,
} from '../../store/ducks/products/actions';
import { Product, ProductState } from '../../store/ducks/products/types';

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@material-ui/core';

import { Form } from './styles';

interface propsModal {
  id: string;
  open: boolean;
  openModal: (open: boolean) => void;
}

interface stateProps {
  products: ProductState;
}

function ModalEdit(props: propsModal) {
  const [product, setProduct] = useState<Product | any>(undefined);
  const { productSelected, loading } = useSelector((state: stateProps) => state.products);
  const dispatch = useDispatch();

  function close() {
    props.openModal(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  function save() {
    setProduct(undefined);
    dispatch(productRequestEdit(props.id, product));
    props.openModal(false);
  }

  useEffect(() => {
    dispatch(productSelectedEdit(props.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  return (
    <Dialog fullWidth maxWidth="xs" open={props.open}>
      <DialogContent>
        <Form>
          <TextField
            id="standard-basic"
            fullWidth
            label="Name"
            name="name"
            value={product?.name}
            defaultValue={productSelected?.name}
            onChange={handleInputChange}
          /><br />
          <TextField
            id="standard-basic"
            fullWidth
            label="Description"
            name="description"
            defaultValue={productSelected?.description}
            value={product?.description}
            onChange={handleInputChange}
          /><br />
          <TextField
            id="standard-basic"
            fullWidth
            label="Price"
            name="price"
            defaultValue={productSelected?.price}
            value={product?.price}
            onChange={handleInputChange}
          /><br />
          <TextField
            id="standard-basic"
            fullWidth
            label="Date"
            name="expiration_date"
            placeholder="dd/mm/yyyy"
            defaultValue={productSelected?.expiration_date_formatted}
            value={product?.expiration_date}
            onChange={handleInputChange}
          /><br />
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

export default ModalEdit;