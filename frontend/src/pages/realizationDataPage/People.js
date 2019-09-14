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

const initialPersonData = { fullName: "" }
const People = () => {
  const [peopleCount, setPeopleCount] = useState(1)
  const [peopleData, setPeopleData] = useImmerState(() => [initialPersonData])

  return (
    <div>
      <Form.Group>
        <Form.Label>Osoby ({peopleCount})</Form.Label>
        <ChangePeopleCountButton>
          <Plus
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
          />
        </ChangePeopleCountButton>
        {[...Array(peopleCount)].map((e, i) => {
          return (
            <Form.Control
              placeholder="Imię i nazwisko"
              value={peopleData[i].fullName}
              onChange={e => {
                e.persist()
                setPeopleData(draft => {
                  draft[i].fullName = e.target.value
                })
              }}
            />
          )
        })}
      </Form.Group>
    </div>
  )
}

export default People
