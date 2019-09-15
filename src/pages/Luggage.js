import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Form } from 'react-bootstrap';

const Content = styled.div`
  background: #f1f2f4;
  height: 100%;
`;

const LuggagePicker = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 10px;
  }
`;

const Luggage = props => {
  const handleLuggageClick = e => {
    if (e.target.checked) {
      props.setLuggageCount(props.luggageCount + 1);
    } else {
      props.setLuggageCount(props.luggageCount - 1);
    }
  };

  return (
    <Container>
      <Content>
        <Row>
          <Col lg={6}>
            <p>{props.luggageCount}</p>
            <div>
              {props.peopleData.map(data => (
                <LuggagePicker>
                  <p key={data.fullName}>{data.fullName}</p>
                  <input type='checkbox' onChange={handleLuggageClick} />
                </LuggagePicker>
              ))}
            </div>
          </Col>
          <Col lg={6}>
            <h1>Informacja o bagażach</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
              odio neque quis dignissimos alias ab iure hic quia, cum obcaecati!
              Tempore aperiam quas dicta laborum odio eligendi qui doloremque
              officiis voluptatem aspernatur expedita quae, sit reiciendis
              quisquam necessitatibus! Eveniet illo tempore vero sunt tenetur
              iste amet, error sequi cumque libero.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem quia magni quisquam, provident asperiores omnis ipsum
              perferendis praesentium, id nam eaque? Commodi deleniti sint
              facilis quidem accusamus fugiat quaerat praesentium.
            </p>
          </Col>
        </Row>
      </Content>
    </Container>
  );
};

export default Luggage;
