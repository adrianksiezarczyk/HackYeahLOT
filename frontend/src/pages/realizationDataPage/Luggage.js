import React from "react"
import styled from "styled-components"
import registerLuggage from "../../assets/images/registerLuggage.png"
import handLuggage from "../../assets/images/handLuggage.png"
import smallBag from "../../assets/images/smallBag.png"

const Content = styled.div`
  display: flex;
`
const Box = styled.div`
  max-height: 300px;
  padding: 5px;
  border-radius: 2px;
  margin: 2px;
  background:#fff;
`
const Image = styled.div`
  width: 150px;
  img {
    width: inherit;
  }
`

const Luggage = () => {
  return (
    <Content>
      <Box>
        <Image>
          <img src={registerLuggage} alt="" />
        </Image>
      </Box>
      <Box>
        <Image>
          <img src={handLuggage} alt="" />
        </Image>
      </Box>
      <Box>
        <Image>
          <img src={smallBag} alt="" />
        </Image>
      </Box>
    </Content>
  )
}

export default Luggage
