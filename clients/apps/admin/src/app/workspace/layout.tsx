'use client'

import { PropsWithChildren } from 'react'
import { Aside } from '~widgets/aside'
import { Nav } from '~widgets/nav'
import { Footer } from '~widgets/footer'
import { Container } from '~infra/ui'

export default function WorkspaceLayout({ children }: PropsWithChildren) {
  return (
    <Aside>
      <Nav />
      <Container>{children}</Container>
      <Footer />
    </Aside>
  )
}
