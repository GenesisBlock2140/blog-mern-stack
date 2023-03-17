
interface MsgErrorFormProps {
  msgError: string
}

export const MsgErrorForm = ( { msgError }: MsgErrorFormProps) => {

  return (
    <>
      {msgError !== "" ?
      <div>
        <p className="text-[20px] text-center text-[#ff5959] mt-8 mx-auto bg-[#ffc5c5] max-w-[500px] rounded-md p-2">
          {`Une erreur est survenu : ${msgError}`}
        </p>
        <input type="text"/>
      </div>
      : null}
    </>
  )
}