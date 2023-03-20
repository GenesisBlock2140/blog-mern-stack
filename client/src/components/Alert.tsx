export enum msgType {
  danger = "danger",
  success = "success"
}

interface AlertProps {
  alertMsg: string
  type: msgType
}

export const Alert = ( { alertMsg, type }: AlertProps) => {

  const alertType = ():string => {
    if (type === "danger") {
      return `text-[#ff5959] bg-[#ffc5c5]`
    }
    return `text-[#207929] bg-[#aae1b7]`
  }

  return (
    <>
      {alertMsg !== "" ?
      <div>
        <p className={`text-[20px] text-center mt-8 mx-auto max-w-[500px] rounded-md p-2 ${alertType()}`}>
          {`${type === "danger" ? "Une erreur est survenu :" : "" } ${alertMsg}`}
        </p>
      </div>
      : null}
    </>
  )
}