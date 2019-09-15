import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Form } from 'react-bootstrap';

import HandLuggage from '../assets/images/handy_luggage.png';
import RegisteredLuggage from '../assets/images/registered_luggage.png';

const StyledContainer = styled(Container)`
  height: 100%;
`;

const Content = styled.div`
  background: #f1f2f4;
  height: 100%;
  padding: 30px;

  .luggage-amount {
    font-size: 1.75rem;
    color: #083377;
    font-weight: 500;

    span {
      font-weight: 700;
    }
  }

  label {
    font-weight: 500;
    font-size: 20px;
    text-transform: uppercase;
    color: #083377;
    display: block;
    padding: 4px 0 5px;
    margin: 0;
    line-height: 1.2;
    margin-bottom: 5px;
    position: relative;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
`;

const LuggagePicker = styled.div`
  display: flex;
  align-items: center;

  p {
    min-width: 180px;
    margin-right: 10px;
    font-size: 16px;
    background: #fff;
    border-radius: 10px;
    padding: 0.7em 1.5em;
    margin-bottom: 5px;
    color: #495057;
  }
`;

const CheckboxStyles = styled.div`
  .form-check {
    margin-top: 5px;
  }

  input {
    width: 20px;
    height: 20px;
    margin: 0 5px 0 -20px;
    line-height: 30px;
    vertical-align: middle;
    margin-bottom: 15px;
  }
  label {
    margin-left: 10px;
    font-weight: 400;
    font-size: 14px;
    position: relative;
    bottom: 3px;
  }
`;

const LuggageButton = styled.div`
  background-color: #e22730;
  color: #fff;
  text-align: center;
  border: none;
  box-shadow: none;
  text-shadow: none;
  border-radius: 5px;
  transition: none 0.2s ease-in;
  width: auto;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  position: relative;
  text-align: center;
  text-decoration: none;
  overflow: hidden;
  vertical-align: top;
  margin: 0;
  font-size: 1.28571em;
  padding: 0 0.55556em 0;
  line-height: 2.05556em;
  background-color: #063778;
  color: #fff;
  text-align: center;
  margin-top: 20px;
`;

const StyledLeftColumn = styled(Col)`
  /* padding: 30px; */
`;

const StyledRightColumn = styled(Col)`
  /* padding: 30px; */
  img {
    max-width: 120px;
    margin-right: 35px;
    height: auto;
  }
`;

const LuggageDesc = styled.div`
  display: flex;
  margin-top: 50px;
`;

const Luggage = props => {
  const handleLuggageClick = checked => {
    if (checked) {
      props.setLuggageCount(props.luggageCount + 1);
    } else {
      props.setLuggageCount(props.luggageCount - 1);
    }
  };

  return (
    <StyledContainer>
      <Content>
        <p className='luggage-amount'>
          Ilość bagażu rejestrowanego: <span>{props.luggageCount}</span>
        </p>
        <Row>
          <StyledLeftColumn lg={6}>
            <div>
              {props.peopleData.map(data => (
                <LuggagePicker>
                  <p key={data.fullName}>{data.fullName}</p>
                  {/* <input type='checkbox' onChange={handleLuggageClick} /> */}
                  <CheckboxStyles>
                    <Form.Check
                      id='luggageCheckbox'
                      label='Wybieram bagaż rejestrowany'
                      onClick={e => {
                        handleLuggageClick(e.target.checked);
                      }}
                    />
                  </CheckboxStyles>
                </LuggagePicker>
              ))}
            </div>
            <LuggageButton onClick={() => props.goToPage(2)}>
              Zaakceptuj
            </LuggageButton>
          </StyledLeftColumn>
          <StyledRightColumn lg={6}>
            <h1>Informacja o bagażach</h1>
            <LuggageDesc>
              <img src={HandLuggage} alt='' />
              <div>
                <h3>Bezpłatny bagaż podręczny</h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolore odio neque quis dignissimos alias ab iure hic quia, cum
                  obcaecati! Tempore aperiam quas dicta laborum odio eligendi
                  qui doloremque officiis voluptatem aspernatur expedita quae,
                  sit reiciendis quisquam necessitatibus! Eveniet illo tempore
                  vero sunt tenetur iste amet, error sequi cumque libero.
                </p>
              </div>
            </LuggageDesc>
            <LuggageDesc>
              <img src={RegisteredLuggage} alt='' />
              <div>
                <h3>Bagaż rejestrowany</h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolore odio neque quis dignissimos alias ab iure hic quia, cum
                  obcaecati! Tempore aperiam quas dicta laborum odio eligendi
                  qui doloremque officiis voluptatem aspernatur expedita quae,
                  sit reiciendis quisquam necessitatibus! Eveniet illo tempore
                  vero sunt tenetur iste amet, error sequi cumque libero.
                </p>
              </div>
            </LuggageDesc>
          </StyledRightColumn>
        </Row>
      </Content>
    </StyledContainer>
  );
};

export default Luggage;
