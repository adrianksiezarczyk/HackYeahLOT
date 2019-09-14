import React from "react"
import styled from "styled-components"

const Page = styled.div`
  height: 100%;
  background: green;
`
const Content = styled.div`
  margin-top: 60px;
`

const FirstPage = () => {
  return (
    <Page>
      <Content>Firstpage</Content>
    </Page>
  )
}

export default FirstPage
