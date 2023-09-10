import { Grid, GridItem } from 'components';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import { useLocation } from 'react-router-dom';

export const CountryList = ({ countries }) => {
  const location = useLocation();
  return (
    <Grid>
      {countries.map(({ country, flag, id }) => (
        <GridItem key={id}>
          <Link to={`${routes.COUNTRY}/${id}`} state={{ from: location }}>
            <img src={flag} alt={country} />
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};
