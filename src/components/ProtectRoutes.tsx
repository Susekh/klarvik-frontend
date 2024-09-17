import { ReactNode } from 'react'

type props = {
    children : ReactNode
}

function ProtectRoutes({children} : props) {

  /*
  - check if user is logged in by verifying jwt tokens then populate slices in store
  - if not logged in redirect to auth page
  */

  return <>{children}</>;
}

export default ProtectRoutes