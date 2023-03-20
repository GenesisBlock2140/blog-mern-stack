import { Link } from "react-router-dom"

interface CardProps {
  cardWidth: number
  author: string
  title: string
}

export const Card = ({cardWidth, author, title}:CardProps) => {

  const formatTitleForUrl = (titleToFormat:string):string => {
    return titleToFormat.split(" ").join("-").toLocaleLowerCase()
  }

  return (
    <>
      <div className={`max-w-[${cardWidth}px] p-2`}>
        <img className="w-[100%] h-auto rounded-md" src="https://fakeimg.pl/350x200/"/>
        <p className="text-[#657382] text-[15px] m-1">{author}</p>
        <Link to={`/blog/${formatTitleForUrl(title)}`} className="text-[#1d2b36] text-[18px] mx-1">{title}</Link>
      </div>
    </>
  )
}