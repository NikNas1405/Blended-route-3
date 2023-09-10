import { Section, Container, CountryInfo, Loader, GoBackBtn } from 'components';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchCountry } from '../service/country-service.js';

export const Country = () => {
  const [findedCountry, setFindedCountry] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const backToPreviousLocation = location?.state?.from ?? '/';

  useEffect(() => {
    setLoading(true);
    if (!id) {
      return;
    }
    const findCountryInRegion = async () => {
      try {
        const fetchCountryById = await fetchCountry(id);
        setFindedCountry(fetchCountryById);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    findCountryInRegion();
  }, [id]);

  return (
    <Section>
      <Container>
        {loading && <Loader />}
        <CountryInfo country={findedCountry} />
        <GoBackBtn path={backToPreviousLocation}>Back to countries</GoBackBtn>
      </Container>
    </Section>
  );
};
