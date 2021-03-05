import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ProductState } from '../../store/ducks/products/types';
import {
  requestProducts,
  productRequestDelete,
  productSearch,
} from '../../store/ducks/products/actions';

import ModalAdd from '../../components/ModalAdd';
import ModalEdit from '../../components/ModalEdit';
import swal from 'sweetalert';

import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Avatar,
  IconButton,
  Fab,
  InputBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, Delete, Add, Search } from '@material-ui/icons';

interface stateProps {
  products: ProductState;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttonAdd: {
    position: 'absolute',
    bottom: 50,
    right: 50,
  },
  inputSearch: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    marginBottom: 20,
  },
});


function Products() {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [productEditSelectedId, setProductEditSelectedId] = useState<string>('');
  const products = useSelector((state: stateProps) => state.products);
  const dispatch = useDispatch();
  const classes = useStyles();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(productSearch(e.target.value));
  }

  function handleOpenModalAdd() {
    setOpenModalAdd(true);
  }

  function handleOpenModalEdit(id: string) {
    setProductEditSelectedId(id);
    setOpenModalEdit(true);
  }

  function handleDelete(id: string) {
    swal('Are you sure you want to delete this product?', {
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: true,
      },
    })
    .then((value) => {
      if(value) {
        dispatch(productRequestDelete(id));
      }
    });
  }

  useEffect(() => {
    dispatch(requestProducts());
  }, [dispatch]);

  return (
    <Container>
      <ModalAdd open={openModalAdd} openModal={setOpenModalAdd} />
      <ModalEdit id={productEditSelectedId} open={openModalEdit} openModal={setOpenModalEdit} />
      <Paper component="form" className={classes.inputSearch}>
        <InputBase placeholder="Search" onChange={handleSearch} />
        <Search />
      </Paper>
      <Fab
        className={classes.buttonAdd}
        color="primary"
        onClick={handleOpenModalAdd}
      >
        <Add />
      </Fab>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.data?.map((product) => (
              <TableRow key={product._id}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.expiration_date_formatted}</TableCell>
                <TableCell>
                  <Avatar alt={product.photo_name} src={product.photo_url} />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    component="span"
                    onClick={() => handleOpenModalEdit(product._id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    component="span"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Products;