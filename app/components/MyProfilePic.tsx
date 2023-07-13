import Image from "next/image";

import React from 'react'

export default function MyProfilePic() {
  return (
    <section>
        <Image
         src="/images/20230514_171044 (1) (1).jpg"
         width={200}
         height={200}
         alt="nkp"
         priority={true}/>
    </section>
  )
}
