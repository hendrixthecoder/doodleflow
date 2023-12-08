import { HourglassBottom } from "@mui/icons-material"


const loading = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center">Please wait while we try to find your board
      <HourglassBottom className="animate-spin text-myPurple"/>
    </div>
  )
}

export default loading