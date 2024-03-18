'use client'
import React, { PropsWithChildren, useState } from 'react'

const Draggable: React.FC<PropsWithChildren> = ({children}) => {

    const [position, setPosition] = useState<{x:number, y:number}>()

    return (
        <div>{children}</div>
    )
}

export default Draggable