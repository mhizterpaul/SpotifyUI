import Card from "./card"
import { Recommendation } from "@/utils/types"


type Props = {
    recommendations: Recommendation[]
}

const Recommendations = ({ recommendations }: Props) => {
    return (
        <section className='flex flex-col w-full justify-center gap-y-4 mt-8'>
            <h3 className='flex flex-row justify-between items-center'>
                Shows you might like
                <span className='uppercase inline-block text-xs' >see all</span>
            </h3>
            <div className='flex flex-row justify-between flex-wrap align-center gap-8'>
                {recommendations.map((el, id) => (
                    <Card {...el} type='recommendations' key={id} />
                ))}
            </div>
        </section>
    )
}

export default Recommendations