import React from 'react'
import { useComponetsStore } from '../../stores/components';

function Setting() {

  const { components  } = useComponetsStore();
  return (
    <div><pre>{JSON.stringify(components, null, 2)}</pre> </div>
  )
}

export default Setting