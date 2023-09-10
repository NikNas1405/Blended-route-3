import { Grid, GridItem } from 'components';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

export const CountryList = ({ countries }) => {
  return (
    <Grid>
      {countries.map(({ country, flag, id }) => (
        <GridItem key={id}>
          <Link to={`${routes.COUNTRY}/${id}`}>
            <img src={flag} alt={country} />
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};
