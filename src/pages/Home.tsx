import { Container, Toolbar } from '@mui/material';
import SurveyForm from 'src/sections/Home/SurveyForm';

export default function Home() {
  return (
    <>
      <Toolbar />
      <Container maxWidth="sm">
        <SurveyForm />
      </Container>
      <Toolbar />
    </>
  );
}
