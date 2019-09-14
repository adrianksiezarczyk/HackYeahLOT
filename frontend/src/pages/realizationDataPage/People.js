import React, { useState } from "react"
import styled from "styled-components"
import { Plus, Minus } from "react-feather"
import { Form } from "react-bootstrap"
import useImmerState from "../../hooks/useImmerState"

const ChangePeopleCountButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const Input = styled.div`
  margin-top: 10px;
`
const StyledLabel = styled(Form.Label)`
  position: relative;
  bottom: 5px;
  margin-right: 5px;
  margin-bottom: 0;
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
const People = () => {
  const [peopleCount, setPeopleCount] = useState(1)
  const [peopleData, setPeopleData] = useImmerState(() => [initialPersonData])

  return (
    <div>
      <Form.Group>
        <StyledLabel>Pasażerowie ({peopleCount})</StyledLabel>
        {/* <Plus
            onClick={() => {
              if (peopleCount < 6) {
                setPeopleData(draft => {
                  draft.push(initialPersonData)
                })
                setPeopleCount(peopleCount + 1)
              }
            }}
          />
        </ChangePeopleCountButton>
        <ChangePeopleCountButton>
          <Minus
            onClick={() => {
              if (peopleCount > 1) {
                setPeopleData(draft => {
                  draft.splice(peopleCount - 1, 0)
                })
                setPeopleCount(peopleCount - 1)
              }
            }}
          /> */}
        {[...Array(peopleCount)].map((e, i) => {
          return (
            <div style={{ display: "flex" }}>
              <Input style={{ flexBasis: "100%" }}>
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