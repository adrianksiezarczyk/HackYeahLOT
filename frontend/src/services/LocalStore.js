import React, { useState } from "react"

const LocalStore = ({ children }) => {
  const [DANE, SETDANE] = useState({ a: "123" })

  return children(DANE)
}

export default LocalStore
