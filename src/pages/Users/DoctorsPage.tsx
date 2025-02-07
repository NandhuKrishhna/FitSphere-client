import Header from "../../components/Header"

const DoctorsPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Header/>
      {/*Filter*/}
        <div className="w-[15%] h-[70vh] bg bg-zinc-500 opacity-60 mt-16 ml-7 rounded-md flex ">
            <p className="text-2xl font-bold  p-3 text-white   ">Filter</p>
            
        </div>
    </div>
  )
}

export default DoctorsPage
