import React from 'react';
import '../../App.css';
import { useHistory } from "react-router-dom";

export default function LandingPage() {
  const history = useHistory();
  return (
    <>
      <button onClick={(e) => history.push('/addPerson')}>sfsd</button>
      <p>Landing Page</p>
    </>
  );
}

