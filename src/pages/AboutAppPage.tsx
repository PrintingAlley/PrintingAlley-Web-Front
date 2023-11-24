import { Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Section1 from 'src/sections/AboutApp/Section1';
import Section2 from 'src/sections/AboutApp/Section2';
import Section3 from 'src/sections/AboutApp/Section3';
import Section4 from 'src/sections/AboutApp/Section4';
import Section5 from 'src/sections/AboutApp/Section5';
import Section6 from 'src/sections/AboutApp/Section6';

export default function AboutAppPage() {
  return (
    <>
      <Helmet>
        <title>앱 소개 | 인쇄골목</title>
      </Helmet>

      <Stack>
        <Section1 />

        <Section2 />

        <Section3 />

        <Section4 />

        <Section5 />

        <Section6 />
      </Stack>
    </>
  );
}
