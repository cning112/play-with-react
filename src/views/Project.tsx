import React from 'react';
import { useParams } from 'react-router-dom';

const Project = () => {
  const { id } = useParams();
  return <p> Project {id}</p>;
};

export { Project };
