import React from "react"
import styled from "styled-components"
import { Container } from "react-bootstrap"
import logo from "../../assets/images/logo.svg"

const Content = styled.div`
  background: #fff;
  position: absolute;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 100;
  display: flex;
  align-items: center;
`
const Logo = styled.div`
  margin-top: 10px;
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
