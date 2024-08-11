import { Document } from '@medplum/react';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Replace 'your_token_here' with your Medplum API token
const bearerToken = 'your_token_here';

export function DataFetchingComponent(): JSX.Element {
  const { id } = useParams();
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.medplum.com/fhir/R4/Patient/${id}`,
    headers: {
      Authorization: bearerToken,
    },
  };

  const [data, setData] = useState<any>(null);
  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.request(config);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <Document>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}</Document>;
}
