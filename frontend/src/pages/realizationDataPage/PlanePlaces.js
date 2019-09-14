import React, { useState } from "react"
import styled from "styled-components"
import SeatPicker from "react-seat-picker"

const Content = styled.div`
  display: flex;
  flex-direction: column;
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
  visibility: hidden;
  ${props => props.visible && "visibility:visible;"}
  display:flex;
  justify-content: center;
`
const Image = styled.div``

const PlanePlaces = () => {
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(1)

  const addSeatCallback = async (row, number, id, cb) => {
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))
    console.log(`Added seat ${number}, row ${row}, id ${id}`)
    cb(row, number)
    setLoading(false)
  }

  const rows = [
    [
      { id: 1, number: 1, isSelected: true },
      { id: 2, number: 2 },
      null,
      { id: 3, number: "3", isReserved: true, orientation: "east" },
      { id: 4, number: "4", orientation: "west" },
      null,
      { id: 5, number: 5 },
      { id: 6, number: 6 }
    ],
    [
      { id: 7, number: 1, isReserved: true },
      { id: 8, number: 2, isReserved: true },
      null,
      { id: 9, number: "3", isReserved: true, orientation: "east" },
      { id: 10, number: "4", orientation: "west" },
      null,
      { id: 11, number: 5 },
      { id: 12, number: 6 }
    ],
    [
      { id: 13, number: 1 },
      { id: 14, number: 2 },
      null,
      { id: 15, number: 3, isReserved: true, orientation: "east" },
      { id: 16, number: "4", orientation: "west" },
      null,
      { id: 17, number: 5 },
      { id: 18, number: 6 }
    ],
    [
      { id: 19, number: 1 },
      { id: 20, number: 2 },
      null,
      { id: 21, number: 3, orientation: "east" },
      { id: 22, number: "4", orientation: "west" },
      null,
      { id: 23, number: 5 },
      { id: 24, number: 6 }
    ],
    [
      { id: 25, number: 1, isReserved: true },
      { id: 26, number: 2, orientation: "east" },
      null,
      { id: 27, number: "3", isReserved: true },
      { id: 28, number: "4", orientation: "west" },
      null,
      { id: 29, number: 5 },
      { id: 30, number: 6, isReserved: true }
    ]
  ]

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
        <TabContent visible={selectedTab === 1}>
          <SeatPicker
            addSeatCallback={addSeatCallback}
            rows={rows}
            maxReservableSeats={3}
            alpha
            visible
            selectedByDefault
            loading={loading}
          />
        </TabContent>
      </TabsContent>
    </Content>
  )
}

export default PlanePlaces
