import { Container, CountryList, Heading, Loader, Section } from 'components';
import { getCountries } from '../service/country-service';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);
      try {
        const countryHome = await getCountries();
        // console.log(countryHome);
        setCountry([...countryHome]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getCountry();
  }, []);

  // console.log(country);

  return (
    <Section>
      <Container>
        <Heading>Countries</Heading>
        {loading && <Loader />}
        <CountryList countries={country} />
      </Container>
    </Section>
  );
};
