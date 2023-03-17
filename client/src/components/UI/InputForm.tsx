
interface InputFormProps {
  nameLabel: string
  typeInput: string
  refInput: React.RefObject<HTMLInputElement>
}

export const InputForm = ({nameLabel, typeInput, refInput}: InputFormProps) => {

  return (
    
    <div className="block w-[300px] mx-auto my-8">
      <label className="text-[#666]">{nameLabel}</label>
      <input 
      className="w-[300px] block border-[#4fb8ff] border-b-2 p-1 text-[#666] text-[22px] !outline-none"
      type={typeInput} 
      ref={refInput}
      required />
    </div>

  )
}