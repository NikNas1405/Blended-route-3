import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [countriesByRegion, setCountriesByRegion] = useState([]);

  const handleSubmit = value => {
    setValue(value);
  };

  useEffect(() => {
    if (!value) {
      return;
    }
    const findCountryByRegion = async () => {
      setLoading(true);
      try {
        const countryByRegion = await fetchByRegion(value);
        setCountriesByRegion([...countryByRegion]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    findCountryByRegion();
  }, [value]);

  return (
    <Section>
      <Container>
        <Heading>Countries search</Heading>
        {loading && <Loader />}
        <SearchForm onSubmit={handleSubmit} />
        <CountryList countries={countriesByRegion} />
      </Container>
    </Section>
  );
};
