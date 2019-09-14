import React from "react"
import styled from "styled-components"
import { Container } from "react-bootstrap"
import logo from "../../assets/images/logo.svg"

const Content = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 100;
  display: flex;
  align-items: center;
  background: #fff;
`
const Logo = styled.div`
  height: 45px;
  img {
    height: inherit;
  }
`

const Header = () => {
  return (
    <Content>
      <Container>
        <Logo>
          <img src={logo} alt="" />
        </Logo>
      </Container>
    </Content>
  )
}

export default Header
