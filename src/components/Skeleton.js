import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { styled } from "styled-components";

const MyDiv = styled('div')(
  () => ({
    marginTop: "70px"
  })
);

const MySkeleton = styled(Skeleton)(
  () => ({
    margin: "auto", 
    width: 290, 
    marginBottom: "5px"
  })
);

const AddSkeleton = styled(MySkeleton)(
  () => ({
    height: 50,
    marginTop: "5px",
    borderRadius: "20px"
  })
);

const SearchSkeleton = styled(MySkeleton)(
  () => ({
    height: 50,
    marginBottom: "20px"
  })
);

const ListSkeleton = styled(MySkeleton)(
  () => ({
    height: 70,
  })
);

export default function Variants() {
  return (
    <MyDiv>
      <AddSkeleton variant="rounded"></AddSkeleton>
      <SearchSkeleton variant="rounded"></SearchSkeleton>
      <ListSkeleton variant="rounded"></ListSkeleton>
      <ListSkeleton variant="rounded"></ListSkeleton>
      <ListSkeleton variant="rounded"></ListSkeleton>
      <ListSkeleton variant="rounded"></ListSkeleton>
    </MyDiv>
  );
}