import React, { useState } from "react"
import styled from "styled-components"
import SeatPicker from "react-seat-picker"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  .seat-enabled {
    background-color: #0069d9;
  }
`
const TabsHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #d9d9d9;
`
const TabHeader = styled.div`
  flex-basis: 100%;
  padding: 5px 5px;
  display: block;
  text-align: center;
  cursor: pointer;
  ${props => props.active && `background-color:#d9d9d9;`}
`
const TabsContent = styled.div``
const TabContent = styled.div`
  display: flex;
  justify-content: center;
`
const TabContent2 = styled(TabContent)``

const PlanePlaces = ({ places, peopleCount }) => {
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(1)

  const addSeatCallback = async (row, number, id, cb) => {
    setLoading(true)

    console.log(`Added seat ${number}, row ${row}, id ${id}`)
    cb(row, number)
    setLoading(false)
  }

  const economicClassPlaces = places
    .filter(p => p.class === "E")
    .reduce((prev, curr, index) => {
      const _curr = {
        id: index + 1,
        number: parseInt(curr.name[1]),
        isReserved: !curr.available
      }
      const firstArrIndex = parseInt(index / 6)
      if (index % 6 === 3) prev[firstArrIndex].push(null)
      if (index % 6 === 0) {
        prev.push([_curr])
      } else {
        prev[firstArrIndex].push(_curr)
      }
      return prev
    }, [])
  const firstClassPlaces = places
    .filter(p => p.class === "F")
    .reduce((prev, curr, index) => {
      const _curr = {
        id: index + 1,
        number: parseInt(curr.name[1]),
        isReserved: !curr.available
      }
      const firstArrIndex = parseInt(index / 6)
      if (index % 6 === 3) prev[firstArrIndex].push(null)
      if (index % 6 === 0) {
        prev.push([_curr])
      } else {
        prev[firstArrIndex].push(_curr)
      }
      return prev
    }, [])

  return (
    <Content>
      <TabsHeader>
        <TabHeader
          active={selectedTab === 1}
          onClick={() => {
            setSelectedTab(1)
          }}
        >
          Pierwsza klasa
        </TabHeader>
        <TabHeader
          active={selectedTab === 2}
          onClick={() => {
            setSelectedTab(2)
          }}
        >
          Druga klasa
        </TabHeader>
      </TabsHeader>
      <TabsContent>
        {selectedTab === 1 ? (
          <TabContent>
            <SeatPicker
              addSeatCallback={addSeatCallback}
              rows={firstClassPlaces}
              maxReservableSeats={peopleCount}
              alpha
              visible
              selectedByDefault
              loading={loading}
            />
          </TabContent>
        ) : (
          <TabContent2>
            <SeatPicker
              addSeatCallback={addSeatCallback}
              rows={economicClassPlaces}
              maxReservableSeats={peopleCount}
              alpha
              visible
              selectedByDefault
              loading={loading}
            />
          </TabContent2>
        )}
      </TabsContent>
    </Content>
  )
}

export default PlanePlaces
