import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ModalCustom from './ModalCustom';
import VIEWS from '../constants/constViews';
import { priceEuros, priceWithVat } from '../utils/priceHelper';
import PRODUCTS from '../constants/constProducts';
import { bindActionCreators } from 'redux';
import { connect, mapStateToProps } from 'react-redux';
import { deleteStarter } from '../store/ducks/starters';
import { deleteMainCourse } from '../store/ducks/mainCourses';
import { deleteDessert } from '../store/ducks/desserts';
import { deleteDrink } from '../store/ducks/drinks';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = () => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class ProductCard extends Component {
  handleDeleteProductFromMenu = (id) => {
    const { type } = this.props;

    switch (type) {
      case PRODUCTS.STARTER:
        this.props.deleteStarter(id);
        break;
      case PRODUCTS.MAIN_COURSE:
        this.props.deleteMainCourse(id);
        break;
      case PRODUCTS.DESSERT:
        this.props.deleteDessert(id);
        break;
      default:
        this.props.deleteDrink(id);
        break;
    }
  };

  render() {
    const {
      classes,
      photo,
      name,
      description,
      df_price,
      vat,
      quantity,
      allergen,
      caller,
      _id,
      handleAddProductToCommand,
    } = this.props;

    const price = priceWithVat(df_price, vat);

    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={photo} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h1">
            {name}
          </Typography>
          <Typography component="p" gutterBottom style={{ minHeight: 40 }}>
            {description}
          </Typography>
          {caller === VIEWS.OWNER && (
            <Typography component="span" variant="h6" gutterBottom>
              {quantity > 1
                ? `${quantity} restants`
                : quantity < 1
                ? 'Hors stock'
                : `${quantity} restant`}
            </Typography>
          )}
        </CardContent>
        <div style={{ marginLeft: '8px' }}>
          {allergen.length === 0 ? (
            <Button disabled>Aucun allergène</Button>
          ) : (
            <ModalCustom
              title="Liste des allergènes"
              buttonText="Voir les allergènes"
              content={
                <List dense={true}>
                  {allergen.map((element, index) => {
                    return (
                      <ListItem key={index}>
                        <ListItemText primary={element.name} />
                      </ListItem>
                    );
                  })}
                </List>
              }
            />
          )}
        </div>
        <CardActions>
          <Typography variant="h5" gutterBottom style={{ padding: '8px' }}>
            {priceEuros(price)}
          </Typography>
          {caller === VIEWS.CUSTOMER ? (
            <Button
              size="small"
              color="primary"
              style={{ marginLeft: 'auto' }}
              {...quantity === 0 && { disabled: true }}
              onClick={() => handleAddProductToCommand({ name, _id, price })}
            >
              Ajouter
            </Button>
          ) : (
            <IconButton
              aria-label="Delete"
              style={{ marginLeft: 'auto' }}
              onClick={() => this.handleDeleteProductFromMenu(_id)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteStarter: deleteStarter.request,
      deleteMainCourse: deleteMainCourse.request,
      deleteDessert: deleteDessert.request,
      deleteDrink: deleteDrink.request,
    },
    dispatch,
  );
};

ProductCard.propTypes = {
  type: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  df_price: PropTypes.number.isRequired,
  vat: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  allergen: PropTypes.arrayOf(PropTypes.object),
  caller: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  handleAddProductToCommand: PropTypes.func,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(ProductCard));
