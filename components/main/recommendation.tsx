import Card from "./card"
import { Recommendation } from "@/store/types"
//render as server component

type Props = {
    recommendations: Recommendation[]
}

const Recommendations = ({ recommendations }: Props) => {
    return (
        <section className = 'flex-col justify-center'>
            <p className='flex flex-row justify-between'>
                <h2>Shows you might like</h2>
                <div className='capitalize ' >see all</div>
            </p>
            <div className='flex flex-row justify-between'>
                {recommendations.map((el, id) => (
                    <Card {...el} type='recommendations' key={id} />
                ))}
            </div>
        </section>
    )
}

export default Recommendations