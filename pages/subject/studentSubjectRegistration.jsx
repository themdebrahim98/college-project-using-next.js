import React from 'react'
import {getOrdinals} from '../../src/Helper/functions';


function studentSubjectAssign() {
  return (
    <div>
      {getOrdinals(1)}
      Student subject Assigned
    </div>
  )
}

export default studentSubjectAssign
