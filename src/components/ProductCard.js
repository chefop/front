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
import ModalCustom from '../ModalCustom';

const styles = () => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class ProductCard extends Component {
  state = {
    dense: false,
  };

  render() {
    const {
      classes,
      photo,
      name,
      description,
      dfPrice,
      vat,
      quantity,
      allergen,
    } = this.props;

    const price = (dfPrice * (1 + vat)).toFixed(2);

    const { dense } = this.state;

    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={photo} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography component="p" gutterBottom>
            {description}
          </Typography>
        </CardContent>
        <div style={{ marginLeft: '8px' }}>
          <ModalCustom
            title="Liste des allergènes"
            buttonText="Voir les allergènes"
            content={
              <List dense={dense}>
                {allergen.map((element, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemText primary={element} />
                    </ListItem>
                  );
                })}
              </List>
            }
          />
        </div>
        <CardActions>
          <Typography variant="h5" gutterBottom style={{ padding: '8px' }}>
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            }).format(price)}
          </Typography>
          <Button
            size="small"
            color="primary"
            style={{ marginLeft: 'auto' }}
            {...quantity === 0 && { disabled: true }}
          >
            Ajouter
          </Button>
        </CardActions>
      </Card>
    );
  }
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dfPrice: PropTypes.number.isRequired,
  vat: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  allergen: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(ProductCard);
