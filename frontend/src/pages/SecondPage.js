import React from "react"

import styled from "styled-components"

const Page = styled.div`
  height: 100%;
  background: rgba(9, 52, 121, 0.85);
`
const Content = styled.div`
`
const SecondPage = () => {
  return (
    <Page>
      <Content>second</Content>
    </Page>
  )
}

export default SecondPage
