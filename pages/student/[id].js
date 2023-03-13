import React from 'react'
import { useRouter } from 'next/dist/client/router'

function data() {
    const router =useRouter();
    const id =router.query.id
  return (

    <div>
      {id}
    </div>
  )
}

export default data
