import React from "react"
import styled from "styled-components"
import { Minus } from "react-feather"
import { Form } from "react-bootstrap"
import useImmerState from "../../hooks/useImmerState"

const Input = styled.div`
  margin-top: 10px;
`
const StyledLabel = styled(Form.Label)`
  position: relative;
  margin-right: 5px;
  margin-bottom: 0;
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;
  color: #083377;
  display: block;
  padding: 4px 0 5px;
  margin: 0;
  line-height: 1.2;
  margin-bottom: 5px;
  position: relative;
`
const AddPassenger = styled.a`
  float: right;
  margin-top: 15px;
`
const MinusIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
  cursor: pointer;
`
const initialPersonData = { fullName: "" }
const People = ({ peopleCount, setPeopleCount, peopleData, setPeopleData }) => {
  return (
    <div>
      <Form.Group>
        <StyledLabel>Pasażerowie ({peopleCount})</StyledLabel>

        {[...Array(peopleCount)].map((e, i) => {
          return (
            <div style={{ display: "flex" }} key={i}>
              <Input style={{ flexBasis: "195px", marginTop: 0 }}>
                <Form.Control
                  key={i}
                  placeholder="Imię i nazwisko"
                  value={peopleData[i].fullName}
                  onChange={e => {
                    e.persist()
                    setPeopleData(draft => {
                      draft[i].fullName = e.target.value
                    })
                  }}
                />
              </Input>
              {peopleCount > 1 && (
                <MinusIcon>
                  <Minus
                    onClick={() => {
                      if (peopleCount > 1) {
                        setPeopleData(draft => {
                          draft.splice(i, 1)
                        })
                        setPeopleCount(peopleCount - 1)
                      }
                    }}
                  />
                </MinusIcon>
              )}
            </div>
          )
        })}
        <AddPassenger
          href=""
          onClick={e => {
            e.preventDefault()
            setPeopleData(draft => {
              draft.push(initialPersonData)
            })
            setPeopleCount(peopleCount + 1)
          }}
        >
          Dodaj kolejnego pasażera
        </AddPassenger>
      </Form.Group>
    </div>
  )
}

export default People
