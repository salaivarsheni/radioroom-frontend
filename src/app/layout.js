import PropTypes from 'prop-types';
import './globals.css';
import '@/utils/dayjs';


// PROJECT IMPORTS
import ProviderWrapper from './ProviderWrapper';

export const metadata = {
  title: 'Radioroom-Admin dashboard',
  description: 'Radioroom-Admin dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node
};
