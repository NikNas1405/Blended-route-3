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
import { useSearchParams } from 'react-router-dom';

export const CountrySearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [countriesByRegion, setCountriesByRegion] = useState([]);

  const handleSubmit = value => {
    setSearchParams({ search: value });
  };

  useEffect(() => {
    const query = searchParams.get('search');
    if (!query) {
      return;
    }
    const findCountryByRegion = async () => {
      setLoading(true);
      try {
        const countryByRegion = await fetchByRegion(query);
        setCountriesByRegion([...countryByRegion]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    findCountryByRegion();
  }, [searchParams]);

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
