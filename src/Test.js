import React, { useState, useEffect } from 'react';
import { Fetch } from 'react-request';

const Test = () => {

  return (
    // <Fetch url="http://10.1.2.54:8000/">
    <Fetch url="/items/0">
    {/* <Fetch url="https://jsonplaceholder.typicode.com/posts/1"> */}
      {({ fetching, failed, data }) => {
        console.log(fetching, failed, data);
        if (fetching) {
          return <div>Loading data...</div>;
        }

        if (failed) {
          return <div>The request did not succeed.</div>;
        }

        if (data) {
          return (
            <div>
              <div>Post ID: {data.id}</div>
              <div>Post Title: {data.info.address}</div>
            </div>
          );
        }

        return null;
      }}
    </Fetch>
  );
}

export default Test;