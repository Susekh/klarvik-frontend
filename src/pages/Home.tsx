import { Check } from "lucide-react"

const featureList = [
  { id: 1, content: 'Quick Authentication' },
  { id: 2, content: 'Google Authentication' },
  { id: 3, content: 'Github Authentication' },
  { id : 4, content : 'Easy to implement'},
  { id : 5, content : 'Payment gateways'}
];


function Home() {
  return (
    <>
    <section className="py-16">
      <div className="p-12 flex flex-wrap items-center justify-center gap-24">
        <div className="flex flex-col flex-wrap gap-12 justify-center text-center md:text-left md:justify-start">
          <h1 className=" text-4xl md:text-6xl font-extrabold leading-normal">
            Ship your solution <span className="bg-gray-200 p-2">fast</span>
          </h1>
          <p className="md:text-lg max-w-2xl">
            Broiler plate for react-node that comes with authentication, payment system, and much more. This is a boiler plate to make your product fast and ship with ease.
          </p>
          <div>
            <button className="rounded-md bg-gray-300 p-4 px-12 hover:bg-gray-400 duration-300">Get started</button>
          </div>
        </div>
        <div className=" border-2 w-96 p-8 rounded-md bg-gray-100">
          <ul className="flex flex-col gap-4 ">
            {
              featureList.map((el) => (<li key={el.id} className="flex gap-4"><Check className="border-2 rounded-sm bg-green-500 text-gray-300"/><p>{el.content}</p></li>))
            }
          </ul>
        </div>
      </div>
    </section>
    <section>
      
    </section>
    </>
  )
}

export default Home