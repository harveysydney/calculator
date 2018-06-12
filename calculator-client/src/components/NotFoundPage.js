import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Container textAlign="center">
      <Header size="huge">404!</Header>
      <Header>Looks like the page you're looking for doesn't exist.</Header>
      <Container>
        You could go back to the <Link to="/">Pay Calculator</Link>
      </Container>
    </Container>
  );

}

export default NotFoundPage;
