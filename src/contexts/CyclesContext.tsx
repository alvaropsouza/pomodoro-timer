import { ReactNode, createContext, useState, useReducer } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'

interface CreateCycleData {
  task: string
  minutesAmount: number
}


interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  elapsedSeconds: number
  cycles: Cycle[]
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}



export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const { cycles, activeCycleId } = cyclesState

  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setElapsedSeconds(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      isActive: true,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setElapsedSeconds(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        elapsedSeconds,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
