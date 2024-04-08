import React from 'react'
import { Container } from 'react-bootstrap';

const SectionTitle = ({title, path}) => {
  return (
    <Container className="border-bottom py-2 border-secondary" style={{ paddingBottom: '2.5rem', borderBottomColor: '#4B5563' }}>
      <h1 className="text-center mb-2" style={{ fontSize: '2.5rem' }}>{title}</h1>
      <p className="text-center" style={{ fontSize: '1rem' }}>{path}</p>
    </Container>
  )
}

export default SectionTitle