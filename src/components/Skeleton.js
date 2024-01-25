import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { styled } from "styled-components";

const MySkeleton = styled(Skeleton)(
  ({ theme }) => ({
    // backgroundColor: theme.colors.colorMain,
    margin: "auto", 
    width: 210, 
    marginBottom: "5px"
  })
);

const AddSkeleton = styled(MySkeleton)(
  () => ({
    height: 30,
    marginTop: "5px"
  })
);

const SearchSkeleton = styled(MySkeleton)(
  () => ({
    height: 40,
    marginBottom: "10px"
  })
);

const ListSkeleton = styled(MySkeleton)(
  () => ({
    height: 60,
  })
);

export default function Variants() {
  return (
    <>
      <AddSkeleton variant="rounded"></AddSkeleton>
      <SearchSkeleton variant="rounded"></SearchSkeleton>
      <ListSkeleton variant="rounded"></ListSkeleton>
      <ListSkeleton variant="rounded"></ListSkeleton>
    </>
  );
}