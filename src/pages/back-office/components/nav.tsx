import images from "@/assets/Images";

const Nav = () => {
  return (
    <div className="w-full bg-white h-[70px] flex justify-between items-center px-0 md:px-5 mb-5 border-b-[1px] border-stroke-clr">
        <img src={images.logo} alt="Vettme" className="h-8 pl-5" />

        <div className="flex items-center px-[30px] gap-4">
            <span className="w-[40px] h-[40px] rounded-full aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </span>
            <p className="font-medium">Hi, John Doe</p>
        </div>
    </div>
  )
}

export default Nav;