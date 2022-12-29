import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  useTheme,
  AppBar,
  Toolbar,
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
  FormControl,
  InputLabel,
  NativeSelect,
  Avatar,
  Box,
  Input,
  Container,
} from "@material-ui/core";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, deleteProductById, getProducts } from "./../actions/product";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons'
import FavSvg from "../assests/starred.svg"
import Navbar from "../components/Navbar";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  table: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
}));

function Read() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products?.loading);
  const products = useSelector((state) => state.products?.items);
  const [productId, setProductId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    console.log('loading', loading)
    if (!loading) {
      setOpen(loading);
    }
  }, [loading]);

  const openDialog = (_id) => {
    setOpen(true);
    setProductId(_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    dispatch(deleteProductById(productId));
  };

  return (
    <React.Fragment>


      {/* <Typography variant="h6" className={classes.title}>
            ReactJs CRUD App With React Redux Thunk
          </Typography> */}
 <Navbar/>
      <Container>
        <div style={{ fontStyle: "normal", letterSpacing: "0.15em", fontSize: "36px", fontWeight: "900", marginBottom: "30px" }}>PRODUCTS</div>

        <div style={{ justifyContent: "space-between", display: "flex" }}>
          {/* <div style={{display:"flex",flexDirection:"row"}}>
            <input style={{ width: "500px", height: "64px",borderRadius:"58px" }}>
            </input>
            <button style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "11px 40px", gap: "10px", left: "561px", top: "10px", background: "#001EB9", borderRadius: "80px",width: "500px", height: "64px" }}>

            </button>
          </div> */}

          <form>
            <input type="text" placeholder="Search.." style={{ fontSize: "17px", border: "1px solid grey", float: "left", width: "450px", height: "56px", background: "#f1f1f1", borderRadius: "58px" }} />
            <button type="submit" style={{ background: "#001EB9", justifyContent: "center", alignItems: "center", borderRadius: "58px", position: "absolute", marginLeft: "-100px", marginTop: "10px", border: "none" }}>

              <FontAwesomeIcon icon={faSearch} style={{ float: "left", width: "20%", padding: "10px", color: "white", fontSize: "17px", borderLeft: "none", cursor: "pointer", borderRadius: "58px" }} />
              <div style={{ display: "flex", flexDirection: "row", paddingTop: "10px", borderRadius: "58px", color: "white" }}>
                Search
              </div>
            </button>
          </form>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to="/create">
              {/* <Button
              className={classes.button}
              startIcon={<AddIcon />}
              sx={{backgroundColor: "#21b6ae"}}
            >
              New Product
            </Button> */}
              <button style={{ backgroundColor: "#001EB9", width: "249px", height: "56px", padding: "15px 15px", borderRadius: "10px" }}>
                <div style={{ fontWeight: "700px", fontSize: "19px", lineHeight: "26px", color: "#F7F7F7" }}>New Product</div>
              </button>
            </Link>


            <Link to="/fav">
              <button style={{ backgroundColor: "white", width: "100px", height: "56px", borderRadius: "10px", borderColor: "#001EB9", marginLeft: "15px" }}>
                <div style={{ lineHeight: "26px", backgroundColor: "white" }}>
                  <img src={FavSvg} style={{ width: "25px", height: "25px" }} alt="React Logo3" />
                </div>
              </button>
            </Link>


          </div>

        </div>




        <TableContainer style={{ marginTop: "30px" }}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell style={{ fontSize: "19px", fontStyle: "normal", color: "#001EB9" }}>SKU</TableCell>
                <TableCell style={{ fontSize: "19px", fontStyle: "normal", color: "#001EB9" }}>IMAGE</TableCell>
                <TableCell style={{ fontSize: "19px", fontStyle: "normal", color: "#001EB9" }}>PRODUCT NAME</TableCell>
                <TableCell style={{ fontSize: "19px", fontStyle: "normal", color: "#001EB9" }}>PRICE</TableCell>

                <TableCell style={{ fontSize: "19px", fontStyle: "normal", color: "#001EB9" }}>{" "}</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row, index) => (
                <TableRow key={index}>

                  <TableCell>{row.sku}</TableCell>
                  <TableCell>{row.image}</TableCell>
                  <TableCell>{row.productname}</TableCell>
                  <TableCell>{row.image}</TableCell>
                  
                  <TableCell>
                    <Link to={`/update/${row._id}`}>
                      <EditIcon>edit</EditIcon>

                    </Link>
                    <DeleteIcon onClick={() => openDialog(row._id)}>
                      delete
                    </DeleteIcon>

                    <img src={FavSvg} style={{ width: "25px", height: "25px" }} alt="React Logo3" />
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {
        open && (
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="Delete Product"
          >
            <DialogContent style={{ width: 300 }}>
              <DialogContentText>Are you sure?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        )
      }
    </React.Fragment >
  );
}

export default Read;
