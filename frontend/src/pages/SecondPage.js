import React from "react"

import styled from "styled-components"

const Page = styled.div`
  height: 100%;
  background: #093479;
`
const Content = styled.div``
const SecondPage = () => {
  return (
    <Page>
      <Content>second</Content>
    </Page>
  )
}

export default SecondPage
