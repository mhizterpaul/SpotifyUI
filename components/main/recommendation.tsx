import Card from "./card"
import { Recommendation } from "@/utils/types"


type Props = {
    recommendations: Recommendation[]
}

const Recommendations = ({ recommendations }: Props) => {
    return (
        <section className='flex-col justify-center'>
            <p className='flex flex-row justify-between'>
                Shows you might like
                <span className='capitalize inline-block' >see all</span>
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