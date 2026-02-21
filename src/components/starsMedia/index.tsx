import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

export function StarsBar(props: { media: number }) {
  return (
    <div className="flex items-center gap-0.5 text-yellow-300">
      {[1, 2, 3, 4, 5].map((nota) => {
        let star = <FaRegStar size={16} />
        if (props.media >= nota) {
          star = <FaStar size={16} />
        }
        else if (props.media > nota - 0.5) {
          star = <FaStarHalfAlt size={16} />
        }
        return (
          <div key={nota}>
            {star}
          </div>
        )
      })}
    </div>
  )
}