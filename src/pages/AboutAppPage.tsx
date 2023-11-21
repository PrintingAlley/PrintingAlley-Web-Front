import ReactFullpage, { Item } from '@fullpage/react-fullpage';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Section1 from 'src/sections/AboutApp/Section1';
import Section2 from 'src/sections/AboutApp/Section2';
import Section3 from 'src/sections/AboutApp/Section3';
import Section4 from 'src/sections/AboutApp/Section4';
import Section5 from 'src/sections/AboutApp/Section5';
import Section6 from 'src/sections/AboutApp/Section6';

export default function AboutAppPage() {
  const [dest, setDest] = useState<Item | null>(null);

  return (
    <>
      <Helmet>
        <title>앱 소개 | 인쇄골목</title>
      </Helmet>

      <Box
        sx={{
          color: 'grey.800',
          backgroundColor: 'common.white',
          // background: `url('/assets/background/overlay_2.jpg') center center / cover no-repeat fixed`,
        }}
      >
        <ReactFullpage
          credits={{ enabled: false, label: '인쇄골목' }}
          afterLoad={(origin, destination, direction) => {
            setDest(destination);
          }}
          scrollingSpeed={1000}
          render={({ state, fullpageApi }) => (
            <ReactFullpage.Wrapper>
              <div className="section">
                <Section1 fullpage={fullpageApi} />
              </div>
              <div className="section">
                <Section2 destination={dest} fullpage={fullpageApi} />
              </div>
              <div className="section">
                <Section3 destination={dest} fullpage={fullpageApi} />
              </div>
              <div className="section">
                <Section4 destination={dest} fullpage={fullpageApi} />
              </div>
              <div className="section">
                <Section5 destination={dest} fullpage={fullpageApi} />
              </div>
              <div className="section">
                <Section6 destination={dest} fullpage={fullpageApi} />
              </div>
            </ReactFullpage.Wrapper>
          )}
        />
      </Box>
    </>
  );
}
