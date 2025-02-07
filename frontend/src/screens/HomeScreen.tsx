import Card from "../Components/Card";
const HomeScreen=()=>{
    const products=[1,2,3,4,5,67];

    return(
        <div className="mt-12 flex flex-wrap justify-center gap-4" >

            { products.map((product)=>{
             return <Card key={product}/>
             })}

        </div>
    )
}

export default HomeScreen;