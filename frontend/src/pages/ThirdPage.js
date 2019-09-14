import React from "react"

import styled from "styled-components"

const Page = styled.div`
  height: 100%;
  background: yellow;
`
const Content = styled.div`
`
const ThirdPage = () => {
  return (
    <Page>
      <Content>third</Content>
    </Page>
  )
}

export default ThirdPage
